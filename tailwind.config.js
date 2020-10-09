module.exports = {
  purge: {
    content : ['./src/**/*.js', './src/**/*.html'],
    ignore: ['prismjs/', '/src/styles/highlight.css'], // Ignore files/folders
    css : ['./src/**/*.css']
  },
  theme: {
    extend: {
      colors: {
        'brand-red': '#ff002b',
        'brand-dark-red': '#cc0022',
      },
      flex: {
        '1': '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        inherit: 'inherit',
        none: 'none',
        '2': '2 2 0%'
      }
    },
  },
  variants: {},
  plugins: []
}
