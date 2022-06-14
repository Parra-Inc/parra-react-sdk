module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: false,
      },
    ],
  },
  ignorePatterns: ['demo/**'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
