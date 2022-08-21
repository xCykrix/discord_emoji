import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { deno } from '../util/deno.ts';

interface EmojiIndex {
  [key: string]: IndividualEmojiIndex;
}
interface IndividualEmojiIndex {
  [key: string]: {
    names: string[];
    surrogates: string;
    diversityChildren?: IndividualEmojiIndex;
  };
}

async function assets(): Promise<string[]> {
  console.info('Downloadng Discord UI...');
  const result = await fetch(
    'https://discord.com/channels/@me/1',
  );
  const html = await result.text();
  const $ = cheerio.load(html);
  const scripts = $('script');
  const links = $('link');

  const urls: string[] = [];
  console.info('Building the list of indexed assets...');
  scripts.each((_index, element) => {
    urls.push($(element).attr('src')!);
  });
  links.each((_index, element) => {
    urls.push($(element).attr('href')!);
  });
  console.info(
    `Finished building the indexed asset list. Found: ${urls.length}.`,
  );

  return urls.filter((v) => v !== undefined && v.endsWith('.js'));
}

console.info('Processing the list of indexed assets.');
let result: EmojiIndex = {};
for (const asset of await assets()) {
  // Download and convert the asset to text in memory.
  // deno-lint-ignore no-await-in-loop
  const source = await fetch(`https://discord.com${asset}`);
  // deno-lint-ignore no-await-in-loop
  const js = await source.text();

  // Skip the assets which do not include the expected snippet.
  if (!js.includes('"people":[')) continue;
  console.info(`Found emoji-index within: ${asset}`);

  // Extract the JSON.parse snippet.
  const re = /;e\.exports=JSON.parse\((.*)\)/g;
  let pos: RegExpExecArray | null = null;
  let val: string | null = null;

  do {
    pos = re.exec(js);
    if (pos) {
      if (pos[1]?.includes('"people":[')) {
        val = pos[1];
        break;
      }
    }
  } while (pos);

  if (val === null) {
    throw new Error(
      'Failed to locate the emoji index. Intervention is required.',
    );
  }
  console.info('Extracted the emoji-index.');

  // Apply to the result.
  val = val.substring(1, val.length - 1);
  result = JSON.parse(`${val}`) as EmojiIndex;

  // Break out to stop the loop.
  break;
}

// Define the outer scope needed to process the emoji-index.
const groups: string[] = [];
const output: string[] = [
  // NOTE: This is the output file. Not this build file directly. Changes to THIS file are potentially accepted.
  '// deno-lint-ignore-file prefer-ascii',
  '// This file is generated automatically with "deno task build" and should not be modified manually.',
  '// Please do not commit changes to this file. They will be rejected regardless of proposed changes.',
  '',
];
let group = '';
let scope: { name: string; value: string }[] = [];

for (const k of Object.keys(result)) {
  // Build the deep scope of the individual category.
  group = k;
  groups.push(k);
  for (const i of Object.values(result[k]!)) {
    for (const n of i.names) {
      scope.push({ name: n, value: i.surrogates });
    }
    if (i.diversityChildren !== undefined) {
      for (const d of Object.values(i.diversityChildren!)) {
        for (const n of d.names) {
          scope.push({ name: n, value: d.surrogates });
        }
      }
    }
  }

  // Process the category to output.
  const state = [
    `/** The '${group}' set of emojis from Discord. */`,
    `const ${group} = {`,
  ];
  for (const v of scope) {
    state.push(`  "${v.name}": "${v.value}",`);
  }
  state.push('}', '');
  output.push(state.join('\n'));
  group = '';
  scope = [];
}

const state = [
  'export {',
];
for (const g of groups) {
  state.push(`  ${g},`);
}
state.push('}', '');
output.push(state.join('\n'));

await Deno.writeFile(
  './mod.ts',
  new TextEncoder().encode(output.join('\n')),
);
const format = await deno(['deno', 'fmt', 'mod.ts']);
console.info(`Formatter Status: ${format.status.code}`);
