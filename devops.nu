#!/usr/bin/env nu
# devops.nu

# std
use std log;

# module
use "./devops/.state/execute.nu" [can_execute];
use "./devops/.state/file.nu" [add, conf];
use "./devops/.state/handle.nu" [fexit];

### --- Setup State --- ###
def "main setup" [] {
  can_execute "git" true;
  conf;

  # Configure Base
  main add-stage 10 "validate";
  main add-stage 20 "build";
  main add-stage 30 "test";
  main add-stage 99 "automation";

  # Add Default Hooks
  main add-hook "pre-commit";
  main add-hook "commit-msg";

  # Configure hooksPath
  git config core.hooksPath "./devops/hook";
  main update-github;

  # chmod
  if ((can_execute "chmod" false) == true) {
    chmod +x devops/hook/*
  }
}

### --- Execute a Stage --- ###
def "main run-stage" [id: int, description: string = '-'] {
  log info $"run-stage|start = './devops/stage-($id).nu';";
  nu $"./devops/conf/stage-($id).nu";
  let exit_code: int = $env.LAST_EXIT_CODE;
  fexit $exit_code $description;
}

### --- Create a Stage --- ###
def "main add-stage" [id: int, description: string] {
  conf;

  log info $"add-stage|($id) ($description)";
  (add
    $"./devops/conf"
    $"stage-($id).nu"
    $'#!/usr/bin/env nu
      # stage-($id).nu [($description)]

      use std log;

      def main [] {
        log info "stage-($id).nu [($description)]";

        # Default Stage Error
        log warning "stage behavior has not yet been configured";
        error make --unspanned {
          msg: "Failed to execute stage [($id)] '($description)'."
          help: "Please review the above output to resolve this issue."
        };
      }' 6)
}

### --- Create a git-hook --- ###
def "main add-hook" [hook: string] {
  conf;

  log info $"hook[create]|hook add ($hook)";
  (add
    $"./devops/hook"
    $"($hook)"
    $'#!/usr/bin/env nu
      # git-hook: ($hook)

      use std log;

      def main [0?: string, 1?: string] {
        log info "hook: ($hook)";

        # Default Hook Error
        log warning "hook behavior has not yet been configured";
        error make --unspanned {
          msg: "Failed to execute hook '($hook)'."
          help: "Please review the above output to resolve this issue."
        };
      }' 6)
}

### --- Upgrade Script from GitHub --- ###
def "main upgrade" [] {

}

### --- Sync Settings to GitHub Repository --- ###
def "main update-github" [] {
  conf;

  let detail = (git remote get-url origin | into string | parse --regex '(?:https://|git@)github.com[/:]{1}([A-Za-z0-9]{1,})/([A-Za-z0-9_.-]{1,})(?:.git)?')
  if (($detail | length) == 0) {
    return (log error $"Invalid 'git remote get-url origin' response. Found '($detail)' but expected a git compatbile uri.");
  }

  # Base APIs
  gh api -X PATCH "/repos/{owner}/{repo}" --input devops/.state/scheme/repo.json | from json;
  gh api -X PUT "/repos/{owner}/{repo}/branches/main/protection" --input devops/.state/scheme/branch-protection.json | from json;
  gh api -X POST "/repos/{owner}/{repo}/branches/main/protection/required_signatures" | from json;

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

### --- Expose Entrypoints  --- ###
def main [] {
}
