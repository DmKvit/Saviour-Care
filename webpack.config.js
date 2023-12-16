const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

process.env.NODE_ENV

module.exports = (env, args) => {
    const isDevelopment = args.mode === 'development';


    return {
        entry: './src/index.js',
        output: {
            filename: './js/bundle.min.[fullhash].js',
            path: path.resolve(__dirname, 'build')
        },
        devServer: {
            port: 9000,
            open: true,
            compress: false,
            hot: true
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                  },
                {
                    test: /\.s[ac]ss|css$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|svg|gif|webp)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'images'
                      },
                },
                {
                    test: /\.(ttf|woff|woff2|eot|svg)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                      },
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template.html'
            }),
            new MiniCssExractPlugin({
                filename: './css/bundle.min.[fullhash].css'
            }),
            new CssMinimizerPlugin(),
        ]
    };
};