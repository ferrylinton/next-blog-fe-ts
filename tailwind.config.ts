/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)'
      },
      colors: {
        lighter: {
          "50": "#f8f8f8",
          "100": "#eeeeee",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929",
        },
        "limexx": {
          "50": "#f7fee7",
          "100": "#ecfccb",
          "200": "#d9f99d",
          "300": "#bef264",
          "400": "#a3e635",
          "500": "#84cc16",
          "600": "#65a30d",
          "700": "#4d7c0f",
          "800": "#3f6212",
          "900": "#365314",
          "950": "#1a2e05",
        },
        darker: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#363636",
          "950": "#262626",
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
