import { build } from "jsr:@deno/dnt@0.41.3";
import { DNTConfig } from "../dnt.conf.ts";

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist/",
  shims: {
    deno: true,
  },
  packageManager: "/run/current-system/sw/bin/npm",
  package: {
    name: DNTConfig.name,
    description: DNTConfig.description,
    version: DNTConfig.version,
    license: "MIT",
    author:
      "Samuel Voeller <sammyvoeller@gmail.com> (https://github.com/xCykrix/discord_emoji)",
    homepage: "https://github.com/xCykrix/discord_emoji",
    repository: {
      type: "git",
      url: "git@github.com/xCykrix/discord_emoji.git",
    },
  },
});

Deno.copyFileSync("LICENSE", "dist/LICENSE");
Deno.copyFileSync("README.md", "dist/README.md");
