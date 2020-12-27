module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true
    },
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc'
  ],
  extends: [
    'eslint:recommended',
    'standard-with-typescript'
  ],
  ignorePatterns: [
    '/dist/',
    '/docs/'
  ],
  env: {
    mocha: true
  },
  rules: {
    'tsdoc/syntax': 'warn'
  }
}
