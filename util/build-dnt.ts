import { build } from "https://deno.land/x/dnt@0.40.0/mod.ts";
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
