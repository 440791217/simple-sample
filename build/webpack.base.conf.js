/**
 * Created by mark on 2017/1/20.
 */
var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var glob=require('glob');
var log=require('mark_logger');
var config=require('../config/index');
var entry=getEntry(config.path.matchJs);
var plugins=getPages(config.path.matchJs);
// 配置目录
// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './public/assets'); // 最后输出放置公共资源的目录




module.exports = {
    // context:ROOT_PATH,
    entry: entry,
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: 'js/[name].js', //每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    plugins:plugins,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader?name=assets/[name].[ext]' + '&publicPath=' + config.build.assetsPublicPath,
                // options: {
                //     name: '[name].[ext]?[hash]'
                // }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}


/*
 extract entry
 */
function getEntry(globPath) {

    var array = {}


    /*
    获取地址
     */

    glob.sync(globPath).forEach(function (entry) {

        var key=path.basename(entry,'.js');
        array[key] = entry;
    })

    for(var key in array){
        log.d("entry---"+key+":"+array[key]);
    }

    return array;
}

function getPages(globPath) {

    var array = [];

    glob.sync(globPath).forEach(function (entry) {
        var basename = path.basename(entry,'.js');
        var page = new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'pages/' + basename + '.html',
            template: '../template/index.html',
            inject: 'body',
            chunks: config.isRelease?['vendors',basename]:[basename],
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        });
        // log.d('page:' + JSON.stringify(page));
        array.push(page);
    })
    return array;
}