const express = require('express')
const app = express()

// const Vue = require('vue')

//引入router
// const Router = require('vue-router')
// Vue.use(Router)


//1,获取绝对路径函数
const resolve = dir => require('path').resolve(__dirname,dir)

//静态目录开放
app.use(express.static(resolve('../dist/client'),{index:false}))

//获取bundleRenderer渲染器导入
const { createBundleRenderer } = require('vue-server-renderer')

const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle,{
    runInNewContext:false,
    template:require('fs').readFileSync(resolve('../public/index.html'),'utf-8'),
    clientManifest:require(resolve('../dist/client/vue-ssr-client-manifest.json'))
})

//创建一个渲染器
// const renderer = createBundleRenderer()

app.get('*', async function (req, res) {
    // const router = new Router({
    //     routes : [
    //         { path: '/', component: {template:'<div>index page</div>' }},
    //         { path: '/detail', component: {template:'<div>detail page</div>'}}
    //       ]
    // })
    // const vm = new Vue({
    //     router,
    //     data:{name:'zzr你是个傻缺'},
    //     template:'<div><router-view></router-view></div>'
    // })

    // console.log(222);
    
    try {
        // console.log(req.url);
        //跳转至url字符串返回给客服端
        //首屏渲染
        // router.push(req.url)
        const html = await renderer.renderToString({
            url:req.url,
            title:'ssr test'
        })
        // 将渲染html字符串返回给客户端
        res.send(html)
    } catch (error) {
        console.log(error);
        
        res.status(500).send('服务器渲染错误，请重试')
    }
})

app.listen(9000,function(){
    console.log(9000);
    
})
