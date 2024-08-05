const joi = require('joi')

//定义用户名密码手机验证规则
const user_username = joi.string().min(3).max(24).required()
const user_password = joi.string().pattern(/^[\S]{6,12}$/).required()
const user_phone = joi.string().alphanum().length(11).pattern(/^1[3|4|5|7|8][0-9]{9}$/).required()

//定义验证规则对象
exports.reg_login_schema = {
  body: {
    user_username,
    user_password,
    user_phone
  }
}

// exports.registerPro = (params, res) => {
//   if (!params.user_username) {
//     return res.cc('用户名不能为空', 400)
//   } else if (!params.user_phone) {
//     return res.cc('注册电话不能为空', 400)
//   } else if (!params.user_password) {
//     return res.cc('用户密码不能为空', 400)
//   }
// }