#!/usr/bin/env nu
# devops.nu

# std
use std log;

# module
use "./devops/.state/execute.nu" [can_execute];
use "./devops/.state/file.nu" [add, conf];

### --- Setup State --- ###
def "main setup" [] {
  can_execute "git" true;

  # Ensure FS
  log info "Ensuring require path(s) exist...";
  conf;

  # Configure Base
  log info "Adding default stage(s) [10, 20, 30] if not exist...";
  main add-stage 10 "lint";
  main add-stage 20 "build";
  main add-stage 30 "test";

  # Add Default Hooks
  log info "Adding default hook(s) [pre-commit, commt-msg] if not exist...";
  main add-hook "pre-commit";
  main add-hook "commit-msg";

  # Configure hooksPath
  log info "Configuring 'core.hooksPath' for current git repository..";
  git config core.hooksPath "./devops/hook";

  # chmod
  if ((can_execute "chmod" false) == true) {
    log info "Applying 'chmod' to git hooks for Linux support.";
    chmod +x devops/hook/*
  }

  # Update GitHub Repository
  log info "Using 'gh' cli to apply master configuration.";
  main update-github;}

### --- Execute a Stage --- ###
def "main run-stage" [...stages: int] {
  for $stage in $stages {
    if ($"./devops/conf/stage-($stage).nu" | path exists) {
      try {
        log info $"Preparing to run 'stage-($stage)' for run-stage call.";
        nu $"./devops/conf/stage-($stage).nu";
      } catch {
        log error $"Failed to run 'stage-($stage)' due to an unknown error. Please review above output.";
        exit $env.LAST_EXIT_CODE;
      }
    } else {
      log warning $"Unable to run 'stage-($stage)' as it was not found in './devops/conf/' path.";
    }
  }
}

### --- Create a Stage --- ###
def "main add-stage" [stage: int, description: string] {
  conf;

  log info $"Adding stage '($stage)' '($description)'.";
  (add
    $"./devops/conf"
    $"stage-($stage).nu"
    $'#!/usr/bin/env nu
      # stage-($stage).nu [($description)]

      use std log;

      def main [] {
        log info "run-stage: ($stage)";

        # Default Stage Error
        log warning "stage not configured";
      }' 6)
}

### --- Create a git-hook --- ###
def "main add-hook" [hook: string] {
  conf;

  log info $"Adding hook '($hook)'.";
  (add
    $"./devops/hook"
    $"($hook)"
    $'#!/usr/bin/env nu
      # git-hook: ($hook)

      use std log;

      def main [0?: string, 1?: string] {
        log info "run-hook: ($hook)";

        # Default Hook Error
        log warning "hook not configured";
      }' 6)
}

### --- Upgrade Script from GitHub --- ###
def "main upgrade" [--reference (-r): string = "main"] {
  if ($env.PWD | str ends-with 'Base') {
    return (log warning $"Local guard triggered. This is the origin of devops.nu and upgrade should not be called here. [ends-with 'Base']");
  }
  http get $"https://raw.githubusercontent.com/xCykrix/Base/($reference)/devops-install.nu" | save -fp devops-install.nu
  nu devops-install.nu
}

### --- Sync Settings to GitHub Repository --- ###
def "main update-github" [] {
  conf;

  # Verify Repository
  let detail = (git remote get-url origin | into string | parse --regex '(?:https://|git@)github.com[/:]{1}([A-Za-z0-9]{1,})/([A-Za-z0-9_.-]{1,})(?:.git)?')
  if (($detail | length) == 0) {
    return (log error $"Invalid 'git remote get-url origin' response. Found '($detail)' but expected a git compatbile uri.");
  }

  # Base APIs
  gh api -X PATCH "/repos/{owner}/{repo}" --input devops/.state/scheme/repo.json | from json;
  gh api -X PUT "/repos/{owner}/{repo}/branches/main/protection" --input devops/.state/scheme/branch-protection.json | from json;
  gh api -X POST "/repos/{owner}/{repo}/branches/main/protection/required_signatures" | from json;

  # Read Webhooks
  let hooks = (gh api -X GET "/repos/{owner}/{repo}/hooks" | from json)
  mut has = false;
  mut id = "";
  for $hook in $hooks {
    if (($hook | get config | get url | str contains "1275197112392482817") == true) {
      $has = true;
      $id = ($hook | get id)
    }
  }
  if ($has == true) {
    gh api -X PATCH /repos/{owner}/{repo}/hooks/($id) --input devops/.state/scheme/patch-hook.json | from json;
  } else {
    gh api -X POST /repos/{owner}/{repo}/hooks --input devops/.state/scheme/post-hook.json | from json;
  }

  # Label states.
  let expected = open devops/.state/scheme/label.json;
  let current = (gh label list --json name,color) | from json;
  mut create = [];
  mut delete = [];

  # If no labels, assume create all and no deletion is needed.
  if ($current == null) {
    $create = $create | append $expected;
  } else {
    # Parse expected labels against current labels for create.
    for elabel in $expected {
      if (($current | find --regex $"^($elabel.name)$" | length) == 0) {
        $create = ($create | append $elabel);
      }
    }
    # Parse current labels against expected labels for delete.
    for clabel in $current {
      if (($expected | find --regex $"^($clabel.name)$" | length) == 0) {
        $delete = ($delete | append $clabel);
      }
    }
  }

  # Create and Delete Labels
  for label in $create {
    gh label create $label.name --color ($label.color | str replace '#' '');
  }
  for label in $delete {
    gh label delete --yes $label.name;
  }
}

### --- Expose Entrypoints --- ###
def main [] {
}
