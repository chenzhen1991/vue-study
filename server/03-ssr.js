const express = require('express');

const app = express();

const { createBundleRenderer } = require('vue-server-renderer')

//获取绝对路径的方法
const resolve = dir => require('path').resolve(__dirname, dir)

//获取静态开放目录
app.use(express.static(resolve('../dist/client'), { index: false }))

const boundle = resolve('../dist/server/vue-ssr-server-bundle.json')

const renderer = createBundleRenderer(boundle, {
    runInNewContext: false,
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'),
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json'))
})

app.get('*', async function (req, res) {
    try {
        const html = await renderer.renderToString({
            url: req.url,
            title: 'ssr test'
        })

        res.send(html)
    } catch (error) {
        res.status(500).send('服务器错误，请稍后再试')
    }
})

app.listen(3000, function () {
    console.log(3000);

})