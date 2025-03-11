const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./layouts/**/*.html', './content/**/*.md'],
  safelist: {
    standard: [
      /^css-doodle/,
      /^pagination/,
      /^highlight/,
      /^data-/,
      /^aria-/,
      ':focus',
      ':hover',
      'active',
      'current'
    ],
    deep: [/^css-doodle/],
    greedy: [/^css-doodle/]
  },
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    }),
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
  ]
}
