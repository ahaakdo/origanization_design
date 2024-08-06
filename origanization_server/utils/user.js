const joi = require('joi')

//定义用户名密码手机验证规则
const user_username = joi.string().min(3).max(24).required()
const user_password = joi.string().pattern(/^[\S]{6,12}$/).required()
const user_phone = joi.string().alphanum().length(11).pattern(/^1[3|4|5|7|8][0-9]{9}$/).required()

//定义验证规则对象
exports.reg_register_schema = {
  body: {
    user_username,
    user_password,
    user_phone
  }
}
exports.reg_login_schema = {
  body: {
    user_username,
    user_password,
  }
}
