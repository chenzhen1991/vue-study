//传统web,网页内容在服务器渲染完成，一次性传输到浏览器
// 属于服务器渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

app.get('/',function(req,res){
    console.log(222);
    
    res.send('hello zzz')
})

app.listen(3000)