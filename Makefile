SHELL := /bin/bash
PHP_VERSIONS ?= 8.5 8.4 8.3 8.2 8.1 7.4
PHP_VERSION ?= 8.4
IMAGE_TAG ?= local/php:$(PHP_VERSION)-test
DOCKERFILE ?= languages/php/$(PHP_VERSION)/Dockerfile.alpine
BUILD_CONTEXT ?= languages/php
CONTAINER_NAME ?= php-test-runner
TEST_PORT ?= 8080

.PHONY: all build test scan build-all test-all clean

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

clean:
	@echo "==> Cleaning up test containers and images..."
	@docker rm -f $(CONTAINER_NAME) 2>/dev/null || true
	@for v in $(PHP_VERSIONS); do \
		docker rm -f $(CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/php:$$v-test 2>/dev/null || true; \
	done
	@docker rmi $(IMAGE_TAG) 2>/dev/null || true
	@echo "Clean completed."
