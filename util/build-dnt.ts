// deno-lint-ignore no-external-import
import { build } from 'jsr:@deno/dnt';
import { parse } from '../deps.ts';
import { DNTConfig } from '../dnt.conf.ts';

const configuration = await parse(await Deno.readTextFile(new URL('../deno.jsonc', import.meta.url))) as {
  version: string;
};

await build({
  entryPoints: ['./mod.ts'],
  outDir: './dist/',
  shims: {
    deno: true,
  },
  package: {
    name: DNTConfig.name,
    description: DNTConfig.description,
    version: configuration.version,
    license: 'MIT',
    author: 'Samuel Voeller <sammyvoeller@gmail.com> (https://github.com/xCykrix/discord_emoji)',
    homepage: 'https://github.com/xCykrix/discord_emoji',
    repository: {
      type: 'git',
      url: 'git@github.com/xCykrix/discord_emoji.git',
    },
  },
  filterDiagnostic(diagnostic): boolean {
    if (diagnostic.file?.fileName.includes('@std')) return false;
    return true;
  },
});

Deno.copyFileSync('LICENSE', 'dist/LICENSE');
Deno.copyFileSync('README.md', 'dist/README.md');
