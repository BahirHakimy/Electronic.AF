module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        background : '#F0F0F0',
        primary : '#00B0FF',
        primaryLight : '#69E2FF',
        primaryDark : '#0081CB',
        secondary : '#01579B'
      },
      borderWidth : {
        '3' : '3px'
      }, 
      spacing : {
        66 : '270px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
