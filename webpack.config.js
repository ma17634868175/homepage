/*
 * @Author: your name
 * @Date: 2020-03-15 22:42:20
 * @LastEditTime: 2020-04-16 15:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-investment/Users/marx/Downloads/GitHub/flappy_bird/webpack.config.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"public/index.html",
            favicon: "public/favicon.ico"
        }),
        new CopyPlugin([
            { from: './src/assets', to: './assets' },
            { from: './src/css', to: './css' },
        ])
    ]
}