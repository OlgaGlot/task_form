const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        style: './src/scss/style.scss',  
        media: './src/scss/media.scss', 
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: { 
                    filename: './img/[name][ext]',       
                },

            },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: {
                          esmodules: true,
                        },
                      },
                    ],
                ],
                  plugins: ["@babel/plugin-transform-runtime"] 
                }
              }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    output: {
    path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
};