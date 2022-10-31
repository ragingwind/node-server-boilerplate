const prettierRules = require('./prettier-rules');
const disabledRules = require('./disabled-rules');
const importRules = require('./import-rules');
const basicRules = require('./basic-rules');
const typescriptRules = require('./typescript-rules');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": [
          "apps/*/tsconfig.json",
          "packages/*/tsconfig.json"
        ],
      }
    }
  },
  rules: {
    ...prettierRules,
    ...disabledRules,
    ...basicRules,
    ...typescriptRules,
    ...importRules
  },
  env: {
    es2021: true,
    node: true,
  },
};
