module.exports = {
  'import/order': [
    'error',
    {
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
      ],
      'newlines-between': 'always',
    },
  ],
  'import/default': 'off',
  'import/no-unresolved': 'error',
  'import/no-named-as-default-member': 'off',
  'import/no-named-as-default': 'off',
};
