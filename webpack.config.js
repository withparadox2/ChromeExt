const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const fs = require('fs')

module.exports = {
  mode: 'production',
  watch: true,
  entry: {
    content: './src/index.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [...excludeCleanPatterns()]
    }),
    new CopyWebpackPlugin([{
      from: 'public/*',
      to: './',
      transformPath(targePath, _) {
        return Promise.resolve(targePath.replace(/public(\/|\\)/, ''))
      }
    }])
  ]
}

function excludeCleanPatterns() {
  return (fs.readdirSync('./public') || []).map(file => `!${file}`)
}