/**
 * Created by mark on 2017/1/20.
 */

require('shelljs/global')
var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.base.conf')
var config=require('../config/index');
var log=require('mark_logger')

var assetsPath = path.join(config.build.assetsRoot)
log.d('assetsPath:'+assetsPath)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig,function (err,stats) {
    log.d("webpacck---err:"+err+"--state:"+stats);
})