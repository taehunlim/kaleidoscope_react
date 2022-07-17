require('dotenv').config({ path: './env/dev.env' });

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      hot: true,
      open: true,
      compress: true,
      port: 3000,
      historyApiFallback: true,
       liveReload: true,
   },
   output: {
      filename: 'js/[name].[fullhash].bundle.js',
      chunkFilename: 'js/[name].[fullhash].chunk.js', //dynamic import
      publicPath: '/',
   },
   module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
      ],
   },
   plugins: [
      new ForkTsCheckerWebpackPlugin(),
   ]
});