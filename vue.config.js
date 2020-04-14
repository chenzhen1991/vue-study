const path = require('path')

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
    }
}