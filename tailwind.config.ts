import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primaryBgColor': 'var(--primaryBgColor)',
        'secondaryBgColor': 'var(--secondaryBgColor)',
        'primaryFontColor': 'var(--primaryFontColor)',
        'neutral': 'var(--neutralFontColor)',
      },
      borderWidth: {
        'thin': '1px',
      },
      backgroundImage: {
        'grade': 'radial-gradient(circle at bottom right, black 10%, transparent, transparent)',
        'charon-overlay': 'linear-gradient(90deg, hsla(198, 71%, 11%, 0.95), hsla(198, 71%, 11%, 0.95)), url(../resources/charon.png)',
        'charon': 'url(../resources/charon.png)',
      },
      boxShadow: {
        'link-shadow': '5px 5px 10px silver',
      },
      maxWidth: {
        'max': '800px'
      }
    },
  },
  plugins: [],
}
export default config
