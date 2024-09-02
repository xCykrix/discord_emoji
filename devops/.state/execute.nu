
use std log;

export def can_execute [command: string, required: bool = false] {
  let search = which $command
  if (($search | length) == 0) {
    if ($required == true) {
      log error $"Please ensure 'git' is installed and available to the path.";
      exit 1;
      return false;
    }
    return false;
  }
  return true;
}
