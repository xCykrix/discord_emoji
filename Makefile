################################
# Project Configuration Makefile
#
# setup
# - Initialize the project for development.
# - Calls './dev/setup.sh'.
#
# validate
# - Validate the project against static analysis.
# - Calls './dev/validate.sh'.
#
# build-dev
# - Compile the project for localized usage.
# - Calls './dev/build-dev.sh'.
#
# build-production
# - Compile the project for production or public usage.
# - Calls './dev/build-production.sh'.
#
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

build-dev:
	@echo "Task: 'build-dev'"
	@mkdir -p "dev"
	@touch ./dev/build-dev.sh
	@chmod +x ./dev/build-dev.sh
	sh ./dev/build-dev.sh
	make validate

build-production:
	@echo "Task: 'build-production'"
	@mkdir -p "dev"
	@touch ./dev/build-production.sh
	@chmod +x ./dev/build-production.sh
	sh ./dev/build-production.sh
	make validate
