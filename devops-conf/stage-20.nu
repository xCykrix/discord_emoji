#!/usr/bin/env nu
# stage-20.nu [build]

use std log;

def main [] {
  log info "stage-20.nu [build]";

  # Default Stage Error
  log warning "stage behavior has not yet been configured";
  error make --unspanned {
    msg: "Failed to execute stage [20] 'build'."
    help: "Please review the above output to resolve this issue."
  };
}