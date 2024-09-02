#!/usr/bin/env nu
# stage-30.nu [test]

use std log;

def main [] {
  log info "run-stage: 30";

  deno test --ignore=dist;
}
