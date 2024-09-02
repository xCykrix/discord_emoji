# discord-emoji

A near exact emoji tables of Discord for string-based insertion of emotes
without having to escape Unicode.

Find more in-depth guidance and documentation can be found on the
[GitHub Wiki](https://github.com/xCykrix/discord_emoji/wiki).

![GitHub License](https://img.shields.io/github/license/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=86400)
![GitHub Issues](https://img.shields.io/github/issues/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)

## Install / Usage

```ts
// Deno
import * as dismoji from "https://deno.land/x/discord_emoji@2./mod.ts";

// Node.js
// $ npm install discord-emoji
const dismoji = require("discord-emoji");

// Examples of Assertions. dismoji.category.identifier
assertEquals(dismoji.people.grinning, "😀");
assertEquals(dismoji.nature.dog, "🐶");
assertEquals(dismoji.food.hamburger, "🍔");
assertEquals(dismoji.activity.basketball, "🏀");
assertEquals(dismoji.travel.airplane, "✈️");
assertEquals(dismoji.objects.watch, "⌚");
assertEquals(dismoji.symbols.eight_pointed_black_star, "✴️");
assertEquals(dismoji.flags.flag_us, "🇺🇸");
```

## Contributing

Please review my
[CONTRIBUTING.md](https://github.com/xCykrix/.github/blob/main/.github/CONTRIBUTING.md)
for the basis of the development environment.

Use of nushell is required for scripting.

## Support

For support, please open an issue or reach out via Discord.

## Acknowledgements

- Necktrox: Previous Author (Marek Kulik)
