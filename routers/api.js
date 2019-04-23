const express = require('express');
const router = express.Router();
const User = require("../models/User")
//统一返回格式
var responseData;

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ""
    }
    next();
})

/**
 * 用户注册
 *  注册逻辑
 *  1.用户名不能为空
 *  2.密码不能为空
 * 
 *  1.是否已经被注册
 *      数据库查询
 */
router.post('/user/register', async (req, res, next) => {
    console.log("注册")
    let {
        username,
        password
    } = req.body;

    if (!username) {
        responseData.code = "1";
        responseData.data = '用户名不能为空'
        res.json(responseData);
        return;
    }
    if (!password) {
        responseData.code = "2";
        responseData.message = '密码不能为空'
        res.json(responseData);
        return;
    }

    var userInfo = await User.findOne({
        username
    });
    
    //已经被注册
    if (userInfo) {
        responseData.code = "4";
        responseData.message = '用户名已经被注册'
        res.json(responseData);
        return;
    }
    var user = new User({
        username,
        password
    });
    var ret = await user.save();
    responseData.message = '注册成功'
    res.json(responseData);
})
router.post('/user/login',async (req, res, next)=>{
    let {
        username,
        password
    } = req.body;
    if (!username) {
        responseData.code = "1";
        responseData.data = '用户名不能为空'
        res.json(responseData);
        return;
    }
    if (!password) {
        responseData.code = "2";
        responseData.message = '密码不能为空'
        res.json(responseData);
        return;
    }

    var userInfo = await User.findOne({
        username
    });
    console.log(userInfo)
    if(!userInfo){
        responseData.code = "3";
        responseData.message = '用户名不存在'
        res.json(responseData);
        return;
    }else{
        let pwd = userInfo.password;
        if(pwd !== password){
            responseData.code = "4";
            responseData.message = '用户名或密码错误'
            res.json(responseData);
            return;
        }else{
            responseData.userinfo = {
                _id:userInfo._id,
                username:userInfo.username
            }
            req.cookies.set("userInfo",JSON.stringify({
                _id:userInfo._id,
                username:userInfo.username
            }));
            responseData.message = '登录成功';
            res.json(responseData);
            return
        }
    }
})

module.exports = router