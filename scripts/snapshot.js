const { js } = require('js-beautify')
const { readdirSync, rmSync, readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

/**
 * Sync Discord Files to Disk and locate the emoji table.
 */
async function process() {
  console.info('Attempting to fetch Discord UI...')
  const scrape = await import('website-scraper')
  await rmSync(resolve(__dirname, './discord_ui/'), {
    force: true,
    recursive: true
  })
  await scrape.default({
    urls: ['https://discord.com/channels/@me/1'],
    directory: resolve(__dirname, './discord_ui/'),
    sources: [
      {selector: 'script', attr: 'src'}
    ]
  })
  console.info('Fetch of the UI has finished.')
  console.info('Attempting to locate emoji js index...')
  for (const file of readdirSync(resolve(__dirname, './discord_ui/js/'))) {
    const minified = await readFileSync(resolve(__dirname, './discord_ui/js/', file)).toString()
    if (minified.includes('"people":[')) {
      console.info('Found emoji js index at', file)
      return minified
    }
  }
  console.info('Failed to locate the emoji js index.')
  throw new Error('build failed')
}

/**
 * Parses the Minified Assets
 *
 * @param {*} minified Minified JS Assets
 */
async function parse(minified) {
  console.info('Attempting to isolate the JSON from the minified JS.')

  // Isolate Logic
  const clean = await js(minified, { indent_size: 2, space_in_empty_paren: true })
  const statement = clean.split('\n').filter((v) => { return v.includes('"people":[') })[0]

  let json = statement.replace('e.exports = JSON.parse(\'', '')
  json = json.substring(0, json.length - 2)
  json = JSON.parse(`${json}`)

  console.info('JSON isolation from the JS has finished.')
  return json
}

/**
 * Formats the Beautified and Stripped Emoji List
 *
 * @param {*} expanded Parsed Emoji List
 */
async function format (expanded) {
  const state = {}

  console.info('Attempting to expand the emoji table.')

  // Expansion Logic
  for (const key of Object.keys(expanded)) {
    state[key] = {}
    for (const emoji of expanded[key]) {
      for (const name of emoji.names) {
        state[key][name] = emoji.surrogates
      }
      if (emoji.diversityChildren) {
        for (const diverseEmoji of emoji.diversityChildren) {
          for (const name of diverseEmoji.names) {
            state[key][name] = diverseEmoji.surrogates
          }
        }
      }
    }
  }

  console.info('Expansion of emoji has been finished.')
  return state
}

/**
 * Write JSON to Disk
 * @param {*} tableList Formatted Pretty Emoji List
 */
async function save (tableList) {
  await writeFileSync(resolve(__dirname, '../_snapshot.json'), JSON.stringify(tableList, undefined, 2))
}

/**
 * Execute Script
 */
async function main () {
  const mini = await process()
  const parsed = await parse(mini)
  const formatted = await format(parsed)

  await save(formatted)
}

main()
