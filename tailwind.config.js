/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      colors:{
        'primary': '#07beb8',
        'secondary': '#0a58ca',
        'bgpriceRed': '#F02055',
         'rosado': '#F6B3C',//este es el rosado
         'bgbotones':  '#009FAF', //el verde de los botones
        'bgnovedad': '#00C16C', //el verde del cartel de novedad
         'bgoff':  ' #2648CE', //azul para el off
         'bgfooter': '#0E3A5A', //fondo del footer
         'bgred': '#F02055', //rojo de los precios
         'bggris': '#A5A5A5', //gris de las CATEGORIAS
         'bggris2': '#EAEDED', //gris de las CATEGORIAS
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
