const path = require('path');

module.exports = {
  entry: {
    App:  "./app/assets/scripts/scripts.js"
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "scripts-bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}