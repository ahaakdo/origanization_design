export type LoginForm = {
  //用户名信息
  username: string,
  //用户密码
  password: string,
  //是否记住
  remember: boolean
}

export type RegisterForm = {
  //用户名信息
  username: string,
  //手机号码
  phoneNumber: string,
  //用户密码
  password: string,
  //再次输入用户密码
  passwordAgain: string,
}