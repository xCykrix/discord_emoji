#!/bin/bash
set -e

validate_lint() {
    deno lint --ignore=dist
}

validate_fmt() {
    deno fmt --check --ignore=dist
}

validate_core() {
    deno test --ignore=dist --no-check -A
}

validate_lint
validate_fmt
validate_core
