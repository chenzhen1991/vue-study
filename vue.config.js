const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)
module.exports = {
    publicPath: '/vue-demo',
    devServer:{
      port: 7070
    },
    // //webpack基础配置， 下面这个配置项姜凯回合webpack的默认配置合并 不适合不用的环境不一样配置
    // configureWebpack: {
    //     name: 'vue项目实践',
    //     resolve: {
    //         alias: {
    //             comps:path.resolve((__dirname, 'src/components'))
    //         }
    //     }
    // }
    configureWebpack: config => {
        // 可以直接修改 也可以返回一个用于合并的对象
        config.resolve.alias.comps = path.resolve(__dirname, 'src/components')
        if (process.env.NODE_ENV === 'development') {
            config.name = 'vue项目实践'
        } else {
            config.name = 'vue project'
        }
    },
    chainWebpack (config) {
        // 找到默认svg-loader，让他排除icons目录
        config.module.rule('svg').exclude.add(resolve('src/icon'))
        // 新增loader，让他去加载icons中的svg
        config.module.rule('icon')
        .test(/\.svg$/)
        .include.add(resolve('src/icon')).end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})
    }
}