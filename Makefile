SHELL := /bin/bash
PHP_VERSIONS ?= 8.5 8.4 8.3 8.2 8.1 7.4
PHP_VERSION ?= 8.4
IMAGE_TAG ?= local/php:$(PHP_VERSION)-test
DOCKERFILE ?= languages/php/$(PHP_VERSION)/Dockerfile.alpine
BUILD_CONTEXT ?= languages/php
CONTAINER_NAME ?= php-test-runner
TEST_PORT ?= 8080

# Laravel Framework Configurations
LARAVEL_VERSIONS ?= 8.4 8.3 8.2 8.1 7.4
LARAVEL_PHP_VERSION ?= 8.4
LARAVEL_IMAGE_TAG ?= local/laravel:$(LARAVEL_PHP_VERSION)-test
LARAVEL_DOCKERFILE ?= frameworks/laravel/Dockerfile
LARAVEL_BUILD_CONTEXT ?= frameworks/laravel
LARAVEL_CONTAINER_NAME ?= laravel-test-runner
LARAVEL_TEST_PORT ?= 8080
LARAVEL_BASE_IMAGE ?= local/php:$(LARAVEL_PHP_VERSION)-test

.PHONY: all build test scan build-all test-all clean \
        build-laravel build-laravel-all test-laravel scan-laravel

all: build test scan

build:
	@echo "==> Building PHP $(PHP_VERSION) Alpine base image..."
	docker build -t $(IMAGE_TAG) -f $(DOCKERFILE) $(BUILD_CONTEXT)

build-all:
	@echo "==> Building all PHP versions: $(PHP_VERSIONS)..."
	@for v in $(PHP_VERSIONS); do \
		echo "===> Building PHP $$v..."; \
		docker build -t local/php:$$v-test -f languages/php/$$v/Dockerfile.alpine $(BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All PHP base images built successfully!"

test:
	@echo "==> Testing runtime environment for $(IMAGE_TAG)..."
	@docker rm -f $(CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(CONTAINER_NAME) -p $(TEST_PORT):8080 $(IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(TEST_PORT)/healthz > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(TEST_PORT)/ | grep -q '"status": "healthy"' || { \
		echo "Health verification failed!"; \
		docker logs $(CONTAINER_NAME); \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(IMAGE_TAG) passed successfully!"

test-all:
	@echo "==> Testing runtime environments for all PHP versions..."
	@for v in $(PHP_VERSIONS); do \
		echo "===> Testing PHP $$v..."; \
		C_NAME="$(CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(TEST_PORT):8080 local/php:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(TEST_PORT)/healthz > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for PHP $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(TEST_PORT)/ | grep -q '"status": "healthy"' || { \
			echo "Health check failed for PHP $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in PHP $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified PHP $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All PHP runtime tests passed successfully!"

scan:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed with zero CRITICAL/HIGH vulnerabilities!"

# ==============================================================================
# Laravel Framework Targets
# ==============================================================================
build-laravel:
	@echo "==> Building Laravel (PHP $(LARAVEL_PHP_VERSION)) Alpine framework image..."
	docker build -t $(LARAVEL_IMAGE_TAG) \
		--build-arg PHP_VERSION=$(LARAVEL_PHP_VERSION) \
		--build-arg BASE_IMAGE=$(LARAVEL_BASE_IMAGE) \
		-f $(LARAVEL_DOCKERFILE) $(LARAVEL_BUILD_CONTEXT)

build-laravel-all:
	@echo "==> Building all Laravel PHP versions: $(LARAVEL_VERSIONS)..."
	@for v in $(LARAVEL_VERSIONS); do \
		echo "===> Building Laravel PHP $$v..."; \
		docker build -t local/laravel:$$v-test \
			--build-arg PHP_VERSION=$$v \
			--build-arg BASE_IMAGE=local/php:$$v-test \
			-f $(LARAVEL_DOCKERFILE) $(LARAVEL_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Laravel framework images built successfully!"

test-laravel:
	@echo "==> 1. Testing direct CLI execution and extensions for $(LARAVEL_IMAGE_TAG)..."
	@UID_VAL=$$(docker run --rm $(LARAVEL_IMAGE_TAG) id -u); \
	if [ "$$UID_VAL" != "10001" ]; then \
		echo "Security failure: Process running as UID $$UID_VAL (expected 10001)"; \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_VAL (appuser)"
	@docker run --rm $(LARAVEL_IMAGE_TAG) php -m | grep -q "pcntl" || { echo "Missing pcntl extension!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) php -m | grep -q "exif" || { echo "Missing exif extension!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) composer --version > /dev/null || { echo "Composer failed!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) node -v > /dev/null || { echo "Node.js failed!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) npm -v > /dev/null || { echo "npm failed!"; exit 1; }
	@echo "Verified: pcntl, exif, Composer v2, Node.js, and npm"

	@echo "==> 2. Testing Web Role (HTTP 8080 & /healthz)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-web 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-web -p $(LARAVEL_TEST_PORT):8080 $(LARAVEL_IMAGE_TAG)
	@READY=0; \
	for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(LARAVEL_TEST_PORT)/healthz > /dev/null 2>&1; then \
			READY=1; \
			break; \
		fi; \
		sleep 1; \
	done; \
	if [ $$READY -ne 1 ]; then \
		echo "Web container failed to start!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-web; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-web; \
		exit 1; \
	fi
	@curl -fsS http://127.0.0.1:$(LARAVEL_TEST_PORT)/ | grep -q '"framework": "Laravel Base Image"' || { \
		echo "Root JSON health check failed!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-web; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-web; \
		exit 1; \
	}
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-web > /dev/null
	@echo "Verified: Web Role (Nginx + PHP-FPM) healthy"

	@echo "==> 3. Testing Worker Role (CONTAINER_ROLE=worker)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-worker 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-worker -e CONTAINER_ROLE=worker -e LARAVEL_QUEUE_NUMPROCS=3 $(LARAVEL_IMAGE_TAG)
	@sleep 3
	@docker exec $(LARAVEL_CONTAINER_NAME)-worker ps aux | grep -q "queue:work" || { \
		echo "Worker process not running!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-worker; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-worker; \
		exit 1; \
	}
	@if docker exec $(LARAVEL_CONTAINER_NAME)-worker ps aux | grep -v grep | grep -E "nginx|php-fpm"; then \
		echo "Isolation error: Nginx or PHP-FPM running in worker role!"; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-worker; \
		exit 1; \
	fi
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-worker > /dev/null
	@echo "Verified: Worker Role (Supervisor queue:work, no web server)"

	@echo "==> 4. Testing Scheduler Role (CONTAINER_ROLE=scheduler)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-scheduler -e CONTAINER_ROLE=scheduler $(LARAVEL_IMAGE_TAG)
	@sleep 3
	@docker exec $(LARAVEL_CONTAINER_NAME)-scheduler ps aux | grep -q "laravel-scheduler" || { \
		echo "Scheduler process not running!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-scheduler; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler; \
		exit 1; \
	}
	@if docker exec $(LARAVEL_CONTAINER_NAME)-scheduler ps aux | grep -v grep | grep -E "nginx|php-fpm"; then \
		echo "Isolation error: Nginx or PHP-FPM running in scheduler role!"; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler; \
		exit 1; \
	fi
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler > /dev/null
	@echo "Verified: Scheduler Role (cron daemon, no web server)"
	@echo "==> All Laravel framework tests passed successfully!"

scan-laravel:
	@echo "==> Running Aqua Trivy scanner for $(LARAVEL_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(LARAVEL_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(LARAVEL_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(LARAVEL_IMAGE_TAG)!"

clean:
	@echo "==> Cleaning up test containers and images..."
	@docker rm -f $(CONTAINER_NAME) $(LARAVEL_CONTAINER_NAME)-web $(LARAVEL_CONTAINER_NAME)-worker $(LARAVEL_CONTAINER_NAME)-scheduler 2>/dev/null || true
	@for v in $(PHP_VERSIONS); do \
		docker rm -f $(CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/php:$$v-test 2>/dev/null || true; \
	done
	@for v in $(LARAVEL_VERSIONS); do \
		docker rmi local/laravel:$$v-test 2>/dev/null || true; \
	done
	@docker rmi $(IMAGE_TAG) $(LARAVEL_IMAGE_TAG) 2>/dev/null || true
	@echo "Clean completed."
