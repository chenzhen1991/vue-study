const express = require('express')
const app = express()

//引入vue
const Vue = require('vue')
//引入vue的服务器渲染的createRender方法
const { createRenderer } = require('vue-server-renderer')
//引入路由
const Router = require('vue-router')
Vue.use(Router)


const renderer = createRenderer()
app.get('*', async function (req, res) {
    //创建路由

    const router = new Router({
        mode:'history',
        routes: [
            { path: '/', component: { template: '<div>index page</div>' } },
            { path: '/detail', component: { template: '<div>detail page</div>' } },
        ]
    })

    //创建一个vue的实例
    const vm = new Vue({
        router,
        data: {
            msg: '我是一个新新消息',
        },
        template: '<div><router-view></router-view></div>'
    })

    //返回的有可能会是错误
    try {
        console.log(req.url);
        
        router.push(req.url)
        //有可能是异步处理
        const html = await renderer.renderToString(vm)
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器错误，请重试')
    }
})

app.listen(3000, function () {
    console.log(3000);
})