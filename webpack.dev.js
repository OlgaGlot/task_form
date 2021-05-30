const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    target: 'web', // фиксация бага devServer, связанного с live-reload
    devtool: 'inline-source-map', 
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            // при режиме dev стили записываются В HTML-файл
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                "style-loader",
                "css-loader",
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
                    loader: "sass-loader",
                    options: {
                      implementation: require("sass"),
                    },
                  },
              ],
            },
        ],
    },
    output: {
        filename: './dist/js/[name].bundle.js',                     
    },
});