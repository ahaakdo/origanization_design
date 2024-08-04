const reg = require('../utils/user')
const db = require('../db/index')
const bcrypt = require('bcryptjs')
//注册操作
exports.regUser = (req, res) => {
  //接收表单数据
  const userInfo = req.body
  reg.registerPro(userInfo, res)
  //定义sql语句，查询用户名是否占用
  const sqlStr = 'select * from user_data where user_username=?'
  if (userInfo.user_username && userInfo.user_password && userInfo.user_phone) {
    db.query(sqlStr, [userInfo.user_username], (err, results) => {
      if (err) return res.send({ status: 400, message: err.message })
      //判断用户名是否被占用
      if (results.length > 0) {
        return res.send({
          status: 401,
          message: '用户名被占用，请更换其他用户名'
        })
      }
      //加密
      userInfo.user_password = bcrypt.hashSync(userInfo.user_password, 10)
      //定义插入新用户的sql语句
      const sql = 'insert into user_data (user_username, user_password, user_phone) values (?,?,?)'
      db.query(sql, [
        userInfo.user_username,
        userInfo.user_password,
        userInfo.user_phone
      ], (err, results) => {
        if (err) {
          return res.send({
            status: 400,
            message: err.message
          })
        }
        //判断影响行数是否为1
        if (results.affectedRows !== 1) {
          return res.send({
            status: 402,
            message: '注册失败，请稍后再试'
          })
        }
        //成功
        res.send({
          status: 200,
          message: '注册成功'
        })
      })
    })
  }

}

//登录操作
exports.logUser = (req, res) => {
  res.send('register ok')
}

//获取验证码
exports.sendCode = (req, res) => {
  console.log(req.body);
  const reg = /^1[3|4|5|7|8][0-9]{9}$/
  if (reg.test(req.body.user_phone)) {
    const code = req.body.user_phone.substr(-4)
    res.send({
      status: 200,
      message: '发送验证码成功',
      result: {
        code: code
      }
    })
  } else {
    res.send({
      status: 200,
      message: '电话号码不正确',
      result: {

      }
    })
  }

}
