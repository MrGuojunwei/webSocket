/*
 * @Description: webpack配置文件
 * @Author: 郭军伟
 * @Date: 2019-12-04 15:15:59
 * @lastEditTime: Do not edit
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/src/main.js',
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './client/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'style.[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            title: 'websocket',
            minify: {
                removeComments: true, // 移除HTML中的注释
            },
            template: path.resolve(__dirname, 'client/index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        port: '3333',
        host: 'localhost',
        historyApiFallback: true,
        open: true,
    }
}