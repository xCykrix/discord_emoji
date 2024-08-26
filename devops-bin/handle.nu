
use std log;

export def fexit [exit_code: int, description: string] {
  if ($exit_code != 0) {
    log error $"($description)|exit = ($exit_code); failed execution";
    exit $exit_code;
  }
  log info $"($description)|exit = 0; successful execution"
  exit 0;
}
