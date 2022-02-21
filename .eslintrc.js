const { resolve } = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: resolve(__dirname, '../../../../../'), // Because ESLint follows the symbolic link...
    project: ["./tsconfig.json"],
  },
  plugins: ["import"],
  extends: [
    "eslint:recommended",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'error'
  },
};
