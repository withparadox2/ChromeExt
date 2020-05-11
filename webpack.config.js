const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    content: './src/index.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'public/*',
      to: './',
      transformPath(targePath, _) {
        return Promise.resolve(targePath.replace(/public(\/|\\)/, ''))
      }
    }])
  ]
}