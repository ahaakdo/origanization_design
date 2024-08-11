<script lang="ts" setup>
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { ref } from 'vue';
import { findPasswordHandler } from '@/apis/user';

//验证码
const send = ref(false)
const text = ref<string>('send code')
const time = ref<number>(60)
const sendCode = () => {
  send.value = true
  text.value = '60s'
  time.value = 60
  if (send.value) {
    const timer = setInterval(() => {
      time.value--
      text.value = time.value + 's'
      if (time.value === 0) {
        clearInterval(timer)
        send.value = false
        text.value = 'send code'
      }
    }, 1000)
  } else {
    text.value = 'send code'
  }
}
//改密码
const findForm = ref({
  username: '',
  code: '',
  password: '',
  passwordAgain: ''
})
const emits = defineEmits(['close'])
const findPassword = async () => {
  if (findForm.value.password !== findForm.value.passwordAgain) {
    return ElMessage.error('两次输入密码不一致！')
  }
  await findPasswordHandler({
    user_username: findForm.value.username,
    user_password: findForm.value.password,
    code: findForm.value.code
  }).then(res => {
    console.log(res);
    if (res.status === 200) {
      ElMessage.success('修改密码成功')
      emits('close')
      findForm.value = {
        username: '',
        code: '',
        password: '',
        passwordAgain: ''
      }
    }
  })
}
</script>

<template>
  <el-dialog :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ $t('messages.findPsw') }}</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          {{ $t('messages.close') }}
        </el-button>
      </div>
    </template>
    <div class="login-box">
      <form>
        <div class="user-box">
          <input type="text" v-model="findForm.username" v-focus name="" required="">
          <label>{{ $t('messages.username') }}</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="findForm.code" name="" required="">
          <button :class="{ send: !send, disabled: send }" :disabled="send" type="button" @click="sendCode">{{ text
            }}</button>
          <label>{{ $t('messages.code') }}</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="findForm.password" name="" required="">
          <label>{{ $t('messages.password') }}</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="findForm.passwordAgain" name="" required="">
          <label>{{ $t('messages.passwordAgain') }}</label>
        </div>
        <center>
          <a href="#" @click="findPassword">
            {{ $t('messages.findPsw') }}
            <span></span>
          </a>
        </center>
      </form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.login-box {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  width: 465px;
  padding: 40px;
  // transform: translate(-50%, -50%);
  // background: rgba(24, 20, 20, 0.987);
  box-sizing: border-box;
  // box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #000000;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #7cec82;
  color: #000000;
  border-radius: 5px;
  box-shadow: 0 0 5px #7cec82,
    0 0 25px #7cec82,
    0 0 50px #7cec82,
    0 0 100px #7cec82;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f40f);
  animation: btn-anim1 1s linear infinite;
}

.send {
  --width: 150px;
  height: 39px;
  --timing: 2s;
  border: 0;
  width: var(--width);
  padding-block: 1em;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  background: rgb(64, 192, 87);
  transition: all 0.2s;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 0;
}

.send:hover {
  background-image: linear-gradient(to right,
      rgb(250, 82, 82),
      rgb(250, 82, 82) 16.65%,
      rgb(190, 75, 219) 16.65%,
      rgb(190, 75, 219) 33.3%,
      rgb(76, 110, 245) 33.3%,
      rgb(76, 110, 245) 49.95%,
      rgb(64, 192, 87) 49.95%,
      rgb(64, 192, 87) 66.6%,
      rgb(250, 176, 5) 66.6%,
      rgb(250, 176, 5) 83.25%,
      rgb(253, 126, 20) 83.25%,
      rgb(253, 126, 20) 100%,
      rgb(250, 82, 82) 100%);
  animation: var(--timing) linear dance6123 infinite;
  transform: scale(1.1) translateY(-1px);
}

@keyframes dance6123 {
  to {
    background-position: var(--width);
  }
}

.disabled {
  --width: 150px;
  height: 39px;
  --timing: 2s;
  border: 0;
  width: var(--width);
  padding-block: 1em;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  background: #7e7e7e;
  transition: all 0.2s;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 0;
}

.eyes {
  position: absolute;
  right: 0%;
}
</style>