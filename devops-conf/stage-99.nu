#!/usr/bin/env nu
# stage-99.nu [automation]

use std log;

def main [] {
  log info "stage-99.nu [automation]";

  # Default Stage Error
  log warning "stage behavior has not yet been configured";
  error make --unspanned {
    msg: "Failed to execute stage [99] 'automation'."
    help: "Please review the above output to resolve this issue."
  };
}