const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/',
      }
    ],
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, "./dist/index.template.html")
  })],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: false,
  },
  stats: { warnings: false },
  // resolve: {
  //   extensions: ['.js'],
  // },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "targets": "> 0.25%, not dead",
                "useBuiltIns": "usage",
                "corejs": "3.8.3",
              }
            ]
          ]
        }
      }
    }]
  }
};