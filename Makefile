################################
# Project Configuration Makefile
################################

setup:
	@echo "Task: 'setup'"
	@mkdir -p "dev"
	@touch ./dev/setup.sh
	@chmod +x ./dev/setup.sh
	sh ./dev/setup.sh

validate:
	@echo "Task: 'validate'"
	@mkdir -p "dev"
	@touch ./dev/validate.sh
	@chmod +x ./dev/validate.sh
	sh ./dev/validate.sh

build:
	@echo "Task: 'build'"
	@mkdir -p "dev"
	@touch ./dev/build.sh
	@chmod +x ./dev/build.sh
	sh ./dev/build.sh
	make validate

build-distribution:
	@echo "Task: build-distribution"
	@mkdir -p "dev"
	@touch ./dev/build-distribution.sh
	@chmod +x ./dev/build-distribution.sh
	sh ./dev/build-distribution.sh
	make validate
