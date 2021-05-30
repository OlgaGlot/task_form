const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts'); 

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 

const TerserPlugin = require("terser-webpack-plugin"); //плагин для минификации .js файлов

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const webpack = require('webpack');

const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: false, 
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                      options: {
                          publicPath: '../',  //фиксация бага в scss, связанного с неправильной трансформацией путей url в полученном css
                      }
                },
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                          plugins: [
                              "autoprefixer",
                          ],
                      },
                    },
                },
                {
                  loader: 'resolve-url-loader',
                },
                {
                  loader: "sass-loader",
                  options: {
                    //`dart-sass`
                    implementation: require("sass"),
                  },
                },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true, 
            }),
            new TerserPlugin(), //минификация .js файлов
        ],
      
        runtimeChunk: 'single', 
        splitChunks: { 
              cacheGroups: { //опции для кеширования 
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
              },
        },
        moduleIds: 'deterministic',
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map', 
          exclude: /vendor*.*/,
        }),
        new RemoveEmptyScriptsPlugin(), 
        new MiniCssExtractPlugin({
            filename: "./css/[name].[contenthash].css",
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        removeViewBox: false,
                      },
                    ],
                  },
                ],
              ],
            },
        }),
    ],
    output: {
      filename: './js/[name].[contenthash].js',
  },
 });

