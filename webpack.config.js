const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"public/index.html"
        }),
        new CopyPlugin([
            { from: './src/assets', to: './assets' },
            { from: './src/css', to: './css' },
        ])
    ]
}