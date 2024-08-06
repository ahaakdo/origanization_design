const reg = require('../utils/user')
const db = require('../db/index')
//密码加密
const bcrypt = require('bcryptjs')
//生成token
const jwt = require('jsonwebtoken')
const config = require('../config.js')

//注册操作
exports.regUser = (req, res) => {
  //接收表单数据
  const userInfo = req.body
  // reg.registerPro(userInfo, res)

  //定义sql语句，查询用户名是否占用
  const sqlStr = 'select * from user_data where user_username=?'
  if (userInfo.user_username && userInfo.user_password && userInfo.user_phone) {
    db.query(sqlStr, [userInfo.user_username], (err, results) => {
      if (err) return res.cc(err, 400)
      //判断用户名是否被占用
      if (results.length > 0) {
        return res.cc('用户名被占用，请更换其他用户名', 401)
      }
      const sqlStrPh = 'select * from user_data where user_phone=?'
      db.query(sqlStrPh, [userInfo.user_phone], (err, results) => {
        if (err) return res.cc(err, 400)
        //判断电话号码是否被占用
        if (results.length > 0) {
          return res.cc('该手机号已被注册，请更换手机号或使用该手机直接登录', 401)
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
            return res.cc(err, 400)
          }
          //判断影响行数是否为1
          if (results.affectedRows !== 1) {
            return res.cc('注册失败，请稍后再试', 402)
          }
          //成功
          res.cc('注册成功', 200)
        })
      })

    })
  }

}

//登录操作
exports.logUser = (req, res) => {
  const userInfo = req.body
  const sql = 'select * from user_data where user_username=?'
  db.query(sql, userInfo.user_username, function (err, results) {
    //执行语句失败
    if (err) return res.cc(err, 400)
    //行数不唯一
    if (results.length !== 1) {
      return res.cc('用户名不存在', 403)
    }
    //判断密码是否正确
    const compareResult = bcrypt.compareSync(userInfo.user_password, results[0].user_password)
    if (!compareResult) {
      return res.cc('密码错误！', 403)
    } else {
      //生成token字符串
      const user = { ...results[0], user_password: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '12h' })
      return res.send({
        status: 200,
        message: '登陆成功',
        data: {
          token: tokenStr
        }
      })
    }
  })
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
