#!/usr/bin/env nu
# stage-20.nu [build]

use std log;

def main [] {
  log info "stage-20.nu [build]";

  deno run --no-prompt --allow-env=NODE_V8_COVERAGE,UNDICI_NO_FG,JEST_WORKER_ID --allow-net --allow-write=mod.ts util/build-mod.ts
}
