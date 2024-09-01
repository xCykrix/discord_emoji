
use std log;

export def fexit [exit_code: int, description: string] {
  if ($exit_code != 0) {
    log error $"($description)|exit = ($exit_code); failed";
    exit $exit_code;
  }
  log info $"($description)|exit = 0; succeeded"
  exit 0;
}
