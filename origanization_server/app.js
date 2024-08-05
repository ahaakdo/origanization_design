//导入express
const express = require('express')
const Joi = require('joi')
//创建服务器实例对象
const app = express()

//导入cors并配置中间件
const cors = require('cors')
app.use(cors())

//配置解析表单中间件 只能解析application/x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//路由前封装res.cc
app.use((req, res, next) => {
  res.cc = function (err, status) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//错误级别中间件
app.use((err, req, res, next) => {
  //验证失败
  if (err instanceof Joi.ValidationError) {
    res.cc(err, 400)
  }
  //未知
  res.cc(err, 400)
})

//启动服务器
app.listen(3000, () => {
  console.log('api server running at http://127.0.0.1:3000');
})