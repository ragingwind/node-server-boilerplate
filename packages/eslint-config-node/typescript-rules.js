module.exports = {
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/ban-ts-ignore': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { ignoreRestSiblings: true },
  ],
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  'no-restricted-imports': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
};
