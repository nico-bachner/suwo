/**
 * see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  singleQuote: true,
  proseWrap: 'always',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
