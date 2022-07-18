const path = require('path');
const rimraf = require('rimraf');

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const { dirname, PROJECT_ROOT, PUBLIC_INDEX } = require('./commonPath');

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production',
   DEV = mode === 'development';

rimraf.sync(path.resolve(PROJECT_ROOT, 'build'));
module.exports = {
   resolve: {
      modules: [path.join(dirname, 'src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
   },
   entry: [path.resolve(dirname, './src/index.tsx')],
   module: {
      rules: [
         {
            test: /\.(ts|tsx|js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: 'images/[name].[ext]',
                     esModule: false,
                  },
               },
            ],
         },
         {
            // write files under 10k to inline or copy files over 10k
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 10000,
                     fallback: 'file-loader',
                     name: 'fonts/[name].[ext]',
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: PUBLIC_INDEX,
         templateParameters: {
            env: DEV ? '(개발)' : '',
         },
      }),
      new webpack.DefinePlugin({
         'process.env': JSON.stringify(process.env),
      }),
   ],
};
