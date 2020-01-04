const path = require('path');
var env = process.env.NODE_ENV
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // port: "8081",
        proxy: {
            '/Api':{
                target:'http://www.huazhengsystem.com',
                changeOrigin:true
            }
        }
    }
}