/** @typedef {import('prettier').Config} PrettierConfig*/
/** @type {PrettierConfig} */
const config = {
  plugins: ['prettier-plugins-tailwindcss'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: 'ea5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  bracketSameLine: false

}
export default config