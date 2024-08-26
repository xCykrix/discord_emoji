#!/usr/bin/env nu
# stage-30.nu [test]

use std log;

def main [] {
  log info "stage-30.nu [test]";

  # Default Stage Error
  log warning "stage behavior has not yet been configured";
  error make --unspanned {
    msg: "Failed to execute stage [30] 'test'."
    help: "Please review the above output to resolve this issue."
  };
}