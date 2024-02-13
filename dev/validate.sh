#!/bin/bash

deno lint --ignore=dist
deno fmt --check --ignore=dist
deno test --ignore=dist --no-check -A
