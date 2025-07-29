/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/index.pug'
  ],
  safelist: [
    {
      pattern: /.*/, // Include everything
    },
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
}

