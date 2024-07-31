const express = require('express')
const router = express.Router()

//导入路由关系
const userHandler = require('../router_handler/user')

//登录
router.post('/login', userHandler.logUser)

//注册
router.post('/register', userHandler.regUser)

//发送验证码
router.post('/verifyCode', userHandler.sendCode)

module.exports = router 