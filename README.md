# githooked

Library | Functional - Stable - A near exact emoji tables of Discord for string-based insertion of emotes without having to escape Unicode.

Find more in-depth guidance and documentation at https://xcykrix.github.io/discord-emoji.html

![GitHub License](https://img.shields.io/github/license/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=86400)
![GitHub issues](https://img.shields.io/github/issues/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)
![GitHub pull requests](https://img.shields.io/github/issues-pr/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)
![GitHub Discussions](https://img.shields.io/github/discussions/xCykrix/discord_emoji?style=for-the-badge&logo=github&cacheSeconds=3600)

## Installation

https://xcykrix.github.io/discord_emoji.html#discord-emoji-installation-and-help

## Usage

```js
// Deno
import * as dismoji from 'https://deno.land/x/discord_emoji/mod.ts';

// Node.js
// $ npm install discord-emoji
const dismoji = require('discord-emoji');

// API
assertEquals(dismoji.people.grinning, '😀');
assertEquals(dismoji.nature.dog, '🐶');
assertEquals(dismoji.food.hamburger, '🍔');
assertEquals(dismoji.activity.basketball, '🏀');
assertEquals(dismoji.travel.airplane, '✈️');
assertEquals(dismoji.objects.watch, '⌚');
assertEquals(dismoji.symbols.eight_pointed_black_star, '✴️');
assertEquals(dismoji.flags.flag_us, '🇺🇸');
```

## Contributing

This project utilizes a Makefile to control the development, workflow, and distribution of the project. This project requires the Snap Store to be installed on your Linux Operating System. These projects are designed for development with Ubuntu Linux
22.04.

When creating a clone, please execute the following command(s):

```sh
$ make setup
$ make build
```

Application is built to `./dist/` when compiled and generates `mod.ts` dynamically by the `make build-dev` task.

## Support

For support, please open an issue or discussion on GitHub for this project.

## Acknowledgements

- Necktrox: Original Author
