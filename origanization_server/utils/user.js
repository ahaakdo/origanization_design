exports.registerPro = (params, res) => {
  if (!params.user_username) {
    return res.send({
      status: 400,
      msg: '用户名不能为空',
      result: {

      }
    })
  } else if (!params.user_phone) {
    return res.send({
      status: 400,
      msg: '注册电话不能为空',
      result: {

      }
    })
  } else if (!params.code) {
    return res.send({
      status: 400,
      msg: '请输入验证码',
      result: {

      }
    })
  } else if (!params.user_password) {
    return res.send({
      status: 400,
      msg: '注册密码不能为空',
      result: {

      }
    })
  }
}