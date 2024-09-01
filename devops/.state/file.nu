
export def conf [] {
  mkdir devops/.state
  mkdir devops/conf
  mkdir devops/hook
}

export def add [path: string, name: string, content: string, space: int = 6] {
  let exists = $"./($path)/($name)" | path exists;
  if ($exists == false) {
    mut result = [];
    for $it in ($content | lines) {
      if (($result | length) == 0) {
        $result = ($result | append $"($it)")
      } else {
        $result = ($result | append $"($it | str substring $space..)")
      }
    }
    $result | str join "\n" | save -fp $"./($path)/($name)";
  }
}
