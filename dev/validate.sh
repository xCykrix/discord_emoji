#!/bin/bash

validate_lint() {
    deno lint --ignore=dist
}

validate_fmt() {
    deno fmt --check --ignore=dist
}

validate_core() {
    rm -r coverage
    deno test --ignore=dist --coverage=./coverage/base/ --no-check -A
    deno coverage --unstable ./coverage/base/ --lcov --output=./coverage/lcov_output
}

validate_lint
validate_fmt
validate_core