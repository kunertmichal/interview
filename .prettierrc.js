module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  printWidth: 80,
  arrowParens: 'always',
  overrides: [
    {
      files: ['tsconfig.json', 'jsconfig.json'],
      options: {
        parser: 'jsonc',
      },
    },
  ],
};
