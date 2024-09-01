#!/usr/bin/env nu
# stage-30.nu [test]

use std log;

def main [] {
  log info "stage-30.nu [test]";

  deno test --ignore=dist
}
