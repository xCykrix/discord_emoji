const del = require('del')
const fetch = require('node-fetch')
const scrape = require('website-scraper')

const fs = require('fs')
const path = require('path')

const { js } = require('js-beautify')

/**
 * Sync Discord Files to Disk and locate the emoji table.
 */
async function process () {
  await del([path.resolve(__dirname, './discord_ui/')])
  await scrape({
    urls: ['https://discord.com/channels/@me/1'],
    directory: path.resolve(__dirname, './discord_ui/')
  })
  for (const file of fs.readdirSync(path.resolve(__dirname, './discord_ui/js/'))) {
    const minified = await fs.readFileSync(path.resolve(__dirname, './discord_ui/js/', file)).toString()
    if (minified.includes('"people":[')) return minified
  }
}

/**
 * Parses the Minified Assets
 *
 * @param {*} minified Minified JS Assets
 */
async function parse (minified) {
  const clean = await js(minified, { indent_size: 2, space_in_empty_paren: true })
  const statement = clean.split('\n').filter((v) => { return v.includes('"people":[') })[0]

  let json = statement.replace('e.exports = JSON.parse(\'', '')
  json = json.substr(0, json.length - 2)
  json = JSON.parse(`${json}`)

  return json
}

/**
 * Formats the Beautified and Stripped Emoji List
 *
 * @param {*} expanded Parsed Emoji List
 */
async function format (expanded) {
  const state = {}

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

  return state
}

/**
 * Write JSON to Disk
 * @param {*} tableList Formatted Pretty Emoji List
 */
async function save (tableList) {
  await fs.writeFileSync(path.resolve(__dirname, '../_snapshot.json'), JSON.stringify(tableList, undefined, 2))
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
