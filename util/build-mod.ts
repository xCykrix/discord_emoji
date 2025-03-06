// deno-lint-ignore-file no-console
// deno-lint-ignore no-external-import
import { cheerio } from 'https://deno.land/x/cheerio@1.0.7/mod.ts';

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
  console.info('Downloading UI...');

  // Build Request State
  const result = await fetch(
    'https://discord.com/channels/@me/1',
  );
  const html = await result.text();
  const $ = cheerio.load(html);

  // Pull all script assets from discord.com
  const urls: string[] = [];

  // Parse Script Tags
  const scripts = $('script');
  console.info('Building the list of indexed assets...');
  // deno-lint-ignore no-explicit-any
  scripts.each((_index: number, element: any) => {
    urls.push($(element).attr('src')!);
  });

  // Parse Link Tags
  const links = $('link');
  // deno-lint-ignore no-explicit-any
  links.each((_index: number, element: any) => {
    urls.push($(element).attr('href')!);
  });

  // Return Filtered & Log Count
  const filtered = urls.filter((v) => v !== undefined && v.endsWith('.js'));
  console.info(
    `Finished building the indexed asset list. Found: ${filtered.length}.`,
  );
  return filtered;
}

// Process Indexed Assets
console.info('Processing the list of indexed assets.');
let result: EmojiIndex = {};
for (const asset of await assets()) {
  // Download and convert the asset to text in memory individually.
  // deno-lint-ignore no-await-in-loop
  const source = await fetch(`https://discord.com${asset}`);
  // deno-lint-ignore no-await-in-loop
  let js = await source.text();

  // Skip the assets which do not include the expected snippet.
  if (!js.includes(`e.exports=JSON.parse('{"people":[`)) {
    console.info(`Skipped: ${asset}`);
    continue;
  }

  // Asset found. Extract emoji index.
  console.info(`Found emoji-index within: ${asset}`);
  js = js.toString().match(
    /(e\.exports=JSON.parse\('{"people":.*"unicodeVersion":6}]}'\))/gm,
  )![0];
  // Extract to file and build with eval.
  const src = `
    class EIndex {
      webpackChunkdiscord_app = []
      e = { exports: {} }

      constructor() {
        _REPLACE_ME_WITH_JS_SRC
      }

      extract() {
        this.webpackChunkdiscord_app[0][1]['838426'](this.e)
      }

      recall() {
        return this.e;
      }
    }
    new EIndex();
  `.replace('_REPLACE_ME_WITH_JS_SRC', js).replace(
    'e.exports',
    'this.e.exports',
  );

  // deno-lint-ignore no-eval
  const extract = eval(src);
  result = extract.e.exports as EmojiIndex;
  console.info('Extracted the emoji-index.');
  break;
}

// Define the outer scope needed to process the emoji-index.
const groups: string[] = [];
const output: string[] = [
  // NOTE: This is the output file. Not this build file directly. Changes to THIS file are potentially accepted.
  '// deno-lint-ignore-file prefer-ascii',
  '// This file is generated automatically with "deno task build" and should not be modified manually.',
  '// Please do not commit changes to this file. They will be rejected regardless of proposed changes.',
  '//',
  `// GENERATED: ${new Date()}`,
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

// Process the compiled category to output.
const state = [
  'export {',
];
for (const g of groups) {
  state.push(`  ${g},`);
}
state.push('}', '');
output.push(state.join('\n'));

// Read Comparison
const current = await Deno.readTextFile('./mod.ts');
const next = output.join('\n');

if (current.replace(/\/\/ GENERATED:.*$/gm, 'COMP_DIFF') !== next.replace(/\/\/ GENERATED:.*$/gm, 'COMP_DIFF')) {
  // Write to the output.
  console.info('File Different.');
  await Deno.writeTextFile(
    './mod.ts',
    next,
  );
} else {
  console.info('File Identical.');
}
