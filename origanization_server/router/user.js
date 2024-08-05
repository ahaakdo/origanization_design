const express = require('express')
const router = express.Router()

//导入路由关系
const userHandler = require('../router_handler/user')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的规则对象
const { reg_login_schema } = require('../utils/user')

//登录
router.post('/login', userHandler.logUser)

//注册
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)

//发送验证码
router.post('/verifyCode', userHandler.sendCode)

module.exports = router 