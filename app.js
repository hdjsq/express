/**
 * 应用程序的启动（入口）文件
 */
//加载express模块
const express = require('express');
//加载模板处理模块
const swig = require('swig');
//加载数据库模块
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Cookies = require('cookies')

//创建app应用 => NodeJS 中 Http。createServer();
const app = express();

//设置静态文件托管
//当访问/public 开始。直接返回对应的 __dianame + /public下的文件
app.use('/public',express.static(__dirname + '/public') );

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板迎请的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录  第一个参数必须是 views。第二个参数是目录
app.set('views','./views')
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.enginez方法中定义的模板引擎的名称（第一个参数）是一致的；
app.set('view engine','html')
//开发环境中，取消模板缓存
swig.setDefaults({cache:false})


//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}))
//设置cookie
app.use((req,res,next)=>{
    req.cookies = new Cookies(req,res);
    req.userInfo = {}
    if(req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
        } catch (error) {
        }
    }
    next();
})
/**
 * 根据不同的功能划分模块
 */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//链接数据库
mongoose.connect('mongodb://localhost:27017/blog',(err)=>{
    if(err){
        console.log('数据库链接失败')
    }else{
        console.log('数据库链接成功');
        //监听请求
        app.listen(8081,()=>{
            console.log("listening on 8081")
        });
    }
});
