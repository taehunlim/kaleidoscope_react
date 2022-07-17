require('dotenv').config({ path: './env/.env' });

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(common, {
   mode: 'production',
   devtool: 'cheap-module-source-map',
   output: {
      filename: 'js/[name].[chunkhash].bundle.js',
      chunkFilename: 'js/[name].[chunkhash].chunk.js', //dynamic import,
      publicPath: '/',
   },
   module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/[name].[contenthash].css',
      }),
   ],
   optimization: {
      splitChunks: {
         name: 'vendors',
         chunks: 'all',
      }, // vendors
      runtimeChunk: {
         name: 'runtime',
      }, // runtime,
      usedExports: true,
      minimize: true,
      minimizer: [
         new TerserPlugin({
            terserOptions: {
               compress: {
                  drop_console: true,
               },
            },
         }),
         new CssMinimizerPlugin(),
      ],
   },
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
   },
});
