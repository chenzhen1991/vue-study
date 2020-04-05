//引入expres
const express = require('express')
//调用express方法，并给APP
const app = express()

//app.get方法，给页面发送一个消息  
app.get('/',function(req,res){
    res.send('hello 中国')
})

//监听3000端口

app.listen(3000,function(){
    console.log(3000); 
})