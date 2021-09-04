# Contributing to the Project

## Our Environment

We employ a handful of tools to ensure the integrity of the software that we produce.

Firstly being TypeScript, which is the branch of JavaScript we use while writing our Libraries. This allows us to maintain a consistent release cycle and ensure data integrity.

Following TypeScript, our next most prominent tool is ESLint, which allows us to strictly maintain the styling and flow of our project. We strictly follow StandardJS/TS to style our project. You can find more on it at [ts-standard on npm](https://www.npmjs.com/package/ts-standard).

Mocha and Chai allow us to execute tests on the code that would be published to npm when we make a release, allowing for absolute certainty that changes will not break the active functionality of the library.

How to form your commit messages: https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary

To enforce all of our requirements, we integrate [Husky](https://github.com/typicode/husky) to execute commands on certain Git hooks. To ensure this server side, we integrate with GitHub Workflow Actions to ensure that all of these requirements are followed when submissions are made. Such cases where actions will find an issue is when you do not correctly install the environment and make changes that may not follow our requirements.

## Creating Issues and Submitting PRs

While not strictly required, we would ask that all contributors create a issues or discussions following their feature(s) they may be working on. This will allow us to keep track of who may be working on certain aspects and prevent duplicate pull requests or overlapping changes by the community. These issues can be linked to pull request(s) and automatically closed when applicable pull request(s) are merged into the staging branch.

When you are ready to submit a pull request for your changes, please use the provided templates and fill in applicable information. This will allow us to begin the review process and reach out to you if we have any feedback or questions regarding your changes. When your changes are approved, they will not be immediately released and will be added for the next staging release build. Approved changes will fully land in the next stable release build.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

We ask that you view the provided `CODE_OF_CONDUCT.md` in the root of this project for the exact version and terms in which we enforce, including the applicable actions we may take when incidents are reported.

You can find more information on the Code of Conduct by visiting [Contributor Covenant's](https://www.contributor-covenant.org/) Official Website.
