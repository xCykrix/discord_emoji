# WIP - Contributing to the Project

## Installing the Environment

Everything comes pre-packaged with just running `npm install`, which will configure TypeScript, ESLint StandardJS/TS, and other 3rd party development dependencies.

```bash
git clone https://github.com/amethyst-studio/discord-emoji
npm install
npm run runCompiler # Confirm everything is working.
```

## Our Environment

We employ a handful of tools to ensure the integrity of the software that we produce.

Firstly being TypeScript, which is the branch of JavaScript we use while writing our Libraries. This allows us to maintain a consistent release cycle and ensure data integrity.

Following TypeScript, our next most prominent tool is ESLint, which allows us to strictly maintain the styling and flow of our project. We strictly follow StandardJS/TS to style our project. You can find more on it at [ts-standard on npm](https://www.npmjs.com/package/ts-standard).

Mocha and Chai allow us to execute tests on the code that would be published to npm when we make a release, allowing for 100% certainty that changes will not break the active functionality of the library.

To enforce all of our requirements, we integrate [Husky](https://github.com/typicode/husky) to execute commands on certain Git hooks. To ensure this server side, we integrate with GitHub Workflow Actions to ensure that all of these requirements are followed when submissions are made. Such cases where actions will find an issue is when you do not correctly install the environment and make changes that may not follow our requirements.

## Creating Issues and Submitting PRs

While not strictly required, we would ask that all contributors please create a issue following their feature they may be working on. This will allow us to keep track of who may be working on what and prevent duplicate PRs from appearing for the same work. These issues can be linked to later PRs and automatically closed when you are merged into the staging branch.

When you are ready to submit a PR from your fork, please create a new PR with the template and add any applicable details. We will setup reviews and reach out to you if we have any feedback or questions regarding your changes. When your changes are approved, they will not be immediately released and will be added for the next release cycle of our staging (beta) branches.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

We ask that you view the provided `CODE_OF_CONDUCT.md` in the root of this project for the exact version and terms in which we enforce, including the applicable actions we may take when incidents are reported.

You can find more information on the Code of Conduct by visiting [Contributor Covenant's](https://www.contributor-covenant.org/) Official Website.
