# discord-emoji

Library for Deno. A near exact emoji tables of Discord for string-based insertion of emotes without having to escape Unicode.

**Support and Tooling**

Visit our [GitHub Wiki](/wiki) or [Deno's Dynamic Documentation](https://doc.deno.land/https://deno.land/x/discord_emoji/mod.ts) for assistance with using this tool.

Join the [Amethyst Discord](https://invite-to.amethyst.live/) for real-time assistance and to report issues.

## Built With

We strive to use the latest and greated up-to-date technologies. Our goal is to allow project's using our tools and libraries to flow seemlessly and unhindered by their upstream dependencies (our tools). With strict testing protocols and release cycles,
you can entrust your reliance on our technology stacks.

Generally speaking, all of our tooling and applications follow the same stack:

- [TypeScript for Development](https://www.typescriptlang.org/)
- [Deno for the Runtime](https://deno.land/)
- [deno.land /x/ for Publishing Releases](https://deno.land/x/)
- [githooked for Linting and Style Enforcement](https://deno.land/x/githooked)

With these as our backend technologies:

- [MongoDB](https://www.mongodb.com/) for all database storage.
- [Oak](https://deno.land/x/oak/) for API and frontend hosting.
- [Deno](https://deno.land/) for all server-side activities.

## Getting Started

Getting started is as simple as leveraging your respective platform's import, Node.js require, or simply running a command in the terminal.

### Prerequisites

You'll obviously need the starting components of your project. This guide assumes that you already have an underlying project with Deno and `deno` installed and ready to use. Optionally, you can use Node.js with this specific distributed package.

This project is officially compatible with Deno `v1.20.1` or higher. Earlier versions of Deno may work, and likely do, but are not officially supported and will not be delved into deeply for support should issues arise. We attempt to leverage new
technologies within Deno and JavaScript where it is optimal, so backwards compatability is not always possible.

### Installation

1. Install or import the tool using the method respective to your language selected.

   ```bash
   # Node.js NPM
   > npm install discord-emoji
   ```

   ```js
   // Import with Node.js JavaScript.
   const dismoji = require('discord-emoji');
   ```

   ```ts
   // Import with Node.js TypeScript.
   import * as dismoji from 'discord-emoji';

   // Import with Deno via URL.
   import * as dismoji from 'https://deno.land/x/discord_emoji/mod.ts'; // I would recommend you pin the expected version!
   ```

## Usage

Visit our [GitHub Wiki](/wiki) or [Deno's Dynamic Documentation](https://doc.deno.land/https://deno.land/x/discord_emoji/mod.ts) for assistance with this tooling.

## Roadmap

See the [Open Issues](/issues) for a list of proposed features and known issues.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are absolutely appreciated.

If you have suggestions for adding or removing from the project, please open a discussion with us first to ensure the scope of the project is upheld. If you want to work on an issue, look for the "State: Help Wanted" label and leave a comment saying you
are going to try and take it on!

Some tips for the smooth flow of contribution:

1. Take a look at our [Code of Conduct](https://github.com/amethyst-studio/.github/blob/main/.github/CODE_OF_CONDUCT.md) and [Contributing Guidelines](https://github.com/amethyst-studio/github/blob/main/.github/CONTRIBUTING.md) before starting to make
   your contributions. This will help smooth the workflow and adjustments needed to submitted contributions.
2. Please make sure you check your spelling and grammar and ensure that your code is clean and formatted to the project standard (Deno's built-in fmt).
3. Ensure that you create an individual pull request for each suggestion. Lumping large changes together will require you to rework them into individual changes.

### Creating A Pull Request

1. Create a fork of the project.
2. Check into your feature, fix, or refactor branch. The `/issue_id` is optional if no issue is related to this branch's work.
   1. `git checkout -b feat/username/issue_id`
   2. `git checkout -b fix/username/issue_id`
   3. `git checkout -b refactor/username/issue_id`
3. Commit your changes incrementally, or as a single commit. Incremental commits are preferred for reviewability.
   1. `git commit -m "feat: some new feature"`
   2. `git commit -m "fix: fixed some issue"`
4. Push to the branch you are working in.
   1. `git push origin <branch_name_from_above>`

Finally, open a pull request and fill out the supplied template. After that, one of our contributors will review or approve your changes. Following that, your contribution will land in a later commit once a release window is ready. Usually, this is within
5 days of the contribution being officially accepted.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/amethyst-studio/discord_emoji/blob/main/LICENSE) for more information.

## Authors

- **Samuel Voeller** - _Organization Owner_ - [Samuel Voeller](https://github.com/xCykrix) - Initial Champion / Planner
