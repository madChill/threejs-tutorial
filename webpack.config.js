const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: '[hash].[name].js',
    path: path.join(__dirname, '../build'),
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  devServer: {
    static: path.join(__dirname, '../build'),
    compress: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, '../', 'src/template.html'),
      template: path.resolve(__dirname, 'src/template.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.join(__dirname, '../.development.env'), // Path to .env file (this is the default)
      // safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
  devtool: 'inline-source-map',
};