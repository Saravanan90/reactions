const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index',
    example: './examples/index'
  },
  devServer: {
    port: 3002
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['url-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.(png|svg|jpg|gif|ico)$/,
      //   use: ['file-loader?name=[name].[ext]']
      // }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'examples', 'index.html'),
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico')
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ]
};