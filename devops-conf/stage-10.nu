#!/usr/bin/env nu
# stage-10.nu [validate]

use std log;

def main [] {
  log info "stage-10.nu [validate]";

  # Default Stage Error
  log warning "stage behavior has not yet been configured";
  error make --unspanned {
    msg: "Failed to execute stage [10] 'validate'."
    help: "Please review the above output to resolve this issue."
  };
}