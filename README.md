# discord-emoji

Library - Stable - A near exact emoji tables of Discord for string-based insertion of emotes without having to escape Unicode.

Find more in-depth guidance and documentation can be found on the [GitHub Wiki](https://github.com/xCykrix/discord_emoji/wiki).

![GitHub License](https://img.shields.io/github/license/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=86400) ![GitHub Issues](https://img.shields.io/github/issues/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600) ![GitHub Pull Requests](https://img.shields.io/github/issues-pr/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)
![GitHub Discussions](https://img.shields.io/github/discussions/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)

## Install / Usage

https://github.com/xCykrix/discord_emoji/wiki#installation

```ts
// Deno
import * as dismoji from 'jsr:@amethyst/discord-emoji';

// Node.js
// $ npm install discord-emoji
const dismoji = require('discord-emoji');

// Examples of Assertions. dismoji.category.identifier
assertEquals(dismoji.people.grinning, '😀');
assertEquals(dismoji.nature.dog, '🐶');
assertEquals(dismoji.food.hamburger, '🍔');
assertEquals(dismoji.activity.basketball, '🏀');
assertEquals(dismoji.travel.airplane, '✈️');
assertEquals(dismoji.objects.watch, '⌚');
assertEquals(dismoji.symbols.eight_pointed_black_star, '✴️');
assertEquals(dismoji.flags.flag_us, '🇺🇸');
```

## Support

For support, please open an issue or reach out via Discord.

## Contributing

This project utilizes a Makefile to control the development, workflow, and distribution of the project. Dev Container support is required and VSCode is recommended.

When creating a clone, please execute the following command(s):

```sh
$ make setup
$ make build
```

Application is built to `./dist/` when compiled by the `make build` task.

## Releases

Tag-based releases to GitHub have been automated. Providence-backed Release Automation is configured for JSR.io on each update. Npm is subject to manual release by Maintainers due to being transformed to Node.js compatible format.

GitHub Releases are created for informational purposes.

## Acknowledgements

- Necktrox: Previous Author (Marek Kulik)
