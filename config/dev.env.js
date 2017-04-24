var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var log =require('mark_logger')


var out=merge(prodEnv, {
    NODE_ENV: '"development"'
})

log.d("out:"+JSON.stringify(out));

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
