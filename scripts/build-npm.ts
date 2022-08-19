import { build, emptyDir } from 'https://deno.land/x/dnt/mod.ts';

import { description, name, version } from '../deps.ts';

await emptyDir('./build-for-npm');

await build({
  entryPoints: ['./mod.ts'],
  outDir: './build-for-npm/',
  shims: {
    deno: true,
  },
  package: {
    name: name,
    description: description,
    version: version,
    license: 'MIT',
    author: 'Samuel Voeller <samuel.voeller@amethyst.live> (https://invite-to.amethyst.live)',
    homepage: 'https://github.com/amethyst-studio/discord_emoji',
    repository: {
      type: 'git',
      url: 'git@github.com/amethyst-studio/discord_emoji.git',
    },
  },
});

Deno.copyFileSync('LICENSE', 'build-for-npm/LICENSE');
Deno.copyFileSync('README.md', 'build-for-npm/README.md');
