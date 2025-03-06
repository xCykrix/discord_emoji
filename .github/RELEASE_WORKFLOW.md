# Internal Documentation

Guideline to create a public release via automation.

1. Update `deno.jsonc` to the specified version. Include this in the commit.
2. Verify `make setup` and `make validate` run successfully.
3. `git tag vX.X.X`
4. `git push origin vX.X.X`

This will trigger `.github/workflows/release.yml`.
