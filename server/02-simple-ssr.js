const express = require('express')
const app = express()

const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')

//引入router
const Router = require('vue-router')
Vue.use(Router)

//创建一个渲染器
const renderer = createRenderer()

app.get('*', async function (req, res) {
    const router = new Router({
        routes : [
            { path: '/', component: {template:'<div>index page</div>' }},
            { path: '/detail', component: {template:'<div>detail page</div>'}}
          ]
    })
    const vm = new Vue({
        router,
        data:{name:'zzr你是个傻缺'},
        template:'<div><router-view></router-view></div>'
    })

    console.log(222);
    
    try {
        console.log(req.url);
        //跳转至url字符串返回给客服端
        //首屏渲染
        router.push(req.url)
        const html = await renderer.renderToString(vm)
        // 将渲染html字符串返回给客户端
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器渲染错误，请重试')
    }
})

app.listen(9000,function(){
    console.log(9000);
    
})
