const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /*入口*/
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        /*设置公共模块*/
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'],
    },

    /*输出到dist文件夹，输出文件名字为budle.js */
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    /*路径优化配置*/
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/rudex/actions'),
            reducers: path.join(__dirname, 'src/rudex/reducers'),
            rudex: path.join(__dirname, 'src/rudex')
        }
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src'),
            },{
                test: /\.(css|less)$/,
                exclude: /(src)/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },{
                            loader: 'less-loader'
                        }
                    ],
                    fallback: 'style-loader'
                }),
            },{
                test: /\.(css|less)$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]-[local]_[hash:base64:6]'
                            }
                        },{
                            loader: 'less-loader'
                        }
                    ],
                    fallback: 'style-loader'
                }),
            },{
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ],
            },
        ],
    },
    /*服务器*/
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        // hot: true
    },
    /*报错提示信息*/
    devtool: 'inline-source-map',
    plugins: [
        /*开启热替换，网页不刷新的情况下更新视图*/
        // new webpack.HotModuleReplacementPlugin()
        /* 打包后的css放到一个style.css文件里*/
        new ExtractTextPlugin({
          filename: 'css/index.css',
          disable: false,
          allChunks: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
    ]
};
