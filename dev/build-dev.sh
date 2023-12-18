#!/bin/bash

# Wipe and create 'dist' for clean build.
rm -r dist && mkdir -p dist

# Ensure that 'build.ts' is cached.
deno cache --no-check=remote --reload ./dev/build.ts

DENO_EXEC=$(deno eval 'console.info(Deno.execPath())')
DENO_CACHE=$HOME$(deno eval 'console.info(Deno.execPath().replace(/\/deno$/, "/.cache/deno"))')

# Run Build (with Security Scope)
deno run --no-prompt --allow-net=discord.com --allow-read=$DENO_CACHE,$DENO_EXEC,./ --allow-write=mod.ts,js_temp --allow-run=$DENO_EXEC ./dev/build.ts
