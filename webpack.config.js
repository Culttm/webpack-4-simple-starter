const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const env = process.env.NODE_ENV || "development";

module.exports = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'production' === env ? '[name].[chunkhash].js' : '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new ExtractTextPlugin({filename: 'production' === env ? 'style.[chunkhash].css' : 'style.css', disable: false, allChunks: true}),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new ManifestPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src/js/app'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}