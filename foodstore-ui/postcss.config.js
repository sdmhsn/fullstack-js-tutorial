// tailwind version 2
// module.exports = {
//   plugins: [
//     require('tailwindcss')('./tailwind.config.js'),
//     require('autoprefixer'),
//   ],
// };

// tailwind version 3
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: {},
  },
};

// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': 'postcss-nesting',
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
