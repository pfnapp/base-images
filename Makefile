SHELL := /bin/bash
IMAGE_TAG ?= local/php:8.4-test
DOCKERFILE ?= languages/php/8.4/Dockerfile.alpine
BUILD_CONTEXT ?= languages/php
CONTAINER_NAME ?= php-test-runner
TEST_PORT ?= 8080

.PHONY: all build test scan clean

all: build test scan

build:
	@echo "==> Building PHP 8.4 Alpine base image..."
	docker build -t $(IMAGE_TAG) -f $(DOCKERFILE) $(BUILD_CONTEXT)

test:
	@echo "==> Testing runtime environment..."
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
	curl -fsS http://127.0.0.1:$(TEST_PORT)/ | grep -q '"status": "healthy"' || { \
		echo "Health verification failed!"; \
		docker logs $(CONTAINER_NAME); \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	UID_CHECK=$$(docker exec $(CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(CONTAINER_NAME) > /dev/null
	@echo "==> All runtime tests passed successfully!"

scan:
	@echo "==> Running Aqua Trivy vulnerability scanner..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed with zero CRITICAL/HIGH vulnerabilities!"

clean:
	@echo "==> Cleaning up test containers and images..."
	@docker rm -f $(CONTAINER_NAME) 2>/dev/null || true
	@docker rmi $(IMAGE_TAG) 2>/dev/null || true
	@echo "Clean completed."
