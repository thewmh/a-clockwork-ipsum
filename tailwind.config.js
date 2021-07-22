const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/**/*.html'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        chevron: "url('../icons/chevron.svg')"
      },
      colors: {
        orange: {
          500: '#FF7133',
        },
        'black-chocolate': {
          500: '#201B0E'
        }
      },
      outline: {
        orange: {
          500: '#FF7133',
        },
        'black-chocolate': {
          500: '#201B0E'
        }
      },
      transitionProperty: {
        'background-color': 'background-color',
        'transform': 'transform',
      }
    },
    fill: theme => ({
      'orange': theme('colors.orange.500'),
      'black-chocolate': theme('colors.black-chocolate.500'),
      'white': theme('colors.white'),
    }),
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
      cursor: ['hover'],
      fill: ['hover', 'dark'],
      borderColor: ['dark'],
      outline: ['focus-visible'],
    },
  },
  plugins:[
    plugin(function({ addUtilities, theme, config }) {
      const themeColors = theme('colors');
      const individualBorderColors = Object.keys(themeColors).map(colorName => ({
        [`.border-b-${colorName}`]: {
          borderBottomColor: themeColors[colorName]
        },
        [`.border-t-${colorName}`]: {
          borderTopColor:  themeColors[colorName]
        },
        [`.border-l-${colorName}`]: {
          borderLeftColor:  themeColors[colorName]
        },
        [`.border-r-${colorName}`]: {
          borderRightColor:  themeColors[colorName]
        }
      }));

      addUtilities(individualBorderColors);
    }),
  ],
}
