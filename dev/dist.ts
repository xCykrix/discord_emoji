import { build, emptyDir } from 'https://deno.land/x/dnt@0.39.0/mod.ts';

import { description, name, version } from '../deps.ts';

await emptyDir('./dist');

await build({
  entryPoints: ['./mod.ts'],
  outDir: './dist/',
  shims: {
    deno: true,
  },
  packageManager: '/snap/bin/npm',
  package: {
    name: name,
    description: description,
    version: version,
    license: 'MIT',
    author: 'Samuel Voeller <samuel.voeller@amethyst.live> (https://github.com/xCykrix/discord_emoji)',
    homepage: 'https://github.com/amethyst-studio/discord_emoji',
    repository: {
      type: 'git',
      url: 'git@github.com/amethyst-studio/discord_emoji.git',
    },
  },
});

Deno.copyFileSync('LICENSE', 'dist/LICENSE');
Deno.copyFileSync('README.md', 'dist/README.md');
