module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended', // must be last
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [],
  rules: {
    'prettier/prettier': ['error'],
  },
}
