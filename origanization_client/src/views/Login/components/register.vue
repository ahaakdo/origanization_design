<script lang="ts" setup>
import { ref } from 'vue';
import type { RegisterForm } from '../type/index'
import { registerHandler } from '@/apis/user';
import { ElMessage } from 'element-plus'
import eyes from './eyes.vue';
import { text } from 'stream/consumers';
//定义登录表单信息
const registerForm = ref<RegisterForm>({
  username: '',
  phoneNumber: '',
  password: '',
  passwordAgain: ''
})
//子传父
const emits = defineEmits(['changeWays'])

const changeLoginOrRegister = () => {
  emits('changeWays', 'Login')
}

//密码显示
const psw = ref<'password' | 'text'>('password')
const pswAgain = ref<'password' | 'text'>('password')
const showPsw = (val: boolean) => {
  if (val) {
    psw.value = 'text'
  } else {
    psw.value = 'password'
  }
}
const showPswAgain = (val: boolean) => {
  if (val) {
    pswAgain.value = 'text'
  } else {
    pswAgain.value = 'password'
  }
}

//注册
const regPsw = /^[\S]{6,12}$/
const regLog = /^1[3|4|5|7|8][0-9]{9}$/
const register = async () => {
  if (!registerForm.value.username || !registerForm.value.password
    || !registerForm.value.passwordAgain || !registerForm.value.phoneNumber
  ) {
    ElMessage.error('注册表单值不能为空')
  } else if (registerForm.value.passwordAgain !== registerForm.value.password) {
    ElMessage.warning('两次输入的密码不一致，请检查后再注册')
  } else if (!regPsw.test(registerForm.value.password)) {
    ElMessage.warning('输入密码为6-12位的字符串')
  } else if (!regLog.test(registerForm.value.phoneNumber)) {
    ElMessage.warning('输入密码为6-12位的字符串')
  } else {
    await registerHandler({
      user_username: registerForm.value.username,
      user_password: registerForm.value.password,
      user_phone: registerForm.value.phoneNumber,
    }).then(() => {
      ElMessage.success('注册成功')
      setTimeout(() => {
        changeLoginOrRegister()
      }, 1000)
    })
  }
}
</script>
<template>
  <div class="register_form">
    <h1 id="heading">{{ $t('messages.register') }}</h1>
    <form class="form">

      <div class="flex-column">
        <label>{{ $t('messages.username') }} </label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path
              d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z">
            </path>
          </g>
        </svg>
        <input type="text" v-focus class="input" v-model="registerForm.username"
          :placeholder="$t('messages.enterUsername')">
      </div>
      <div class="flex-column">
        <label>{{ $t('messages.phone') }} </label>
      </div>
      <div class="inputForm">
        <svg class="" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 512 512" y="0" x="0"
          height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path class="" data-original="#000000" fill="#595959"
              d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z">
            </path>
          </g>
        </svg>
        <input type="text" class="input" v-model="registerForm.phoneNumber"
          :placeholder="$t('messages.enterPhonenumber')">
      </div>
      <!-- <div class="flex-column">
        <label>code </label>
      </div>
      <div class="inputForm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z">
          </path>
        </svg>
        <input type="text" class="input" v-model="registerForm.code" placeholder="Enter your Code">
        <button type="button" @click="getCodeFun">
          <span>发送验证码</span>
        </button>
      </div> -->
      <div class="flex-column">
        <label>{{ $t('messages.password') }}</label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
          </path>
          <path
            d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
          </path>
        </svg>
        <input :type="psw" class="input" v-model="registerForm.password" :placeholder="$t('messages.enterPassword')">
        <eyes @showPsw="showPsw" />
      </div>
      <div class="flex-column">
        <label>{{ $t('messages.passwordAgain') }}</label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
          </path>
          <path
            d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
          </path>
        </svg>
        <input :type="pswAgain" class="input" v-model="registerForm.passwordAgain"
          :placeholder="$t('messages.enterPasswordAgain')">
        <eyes @showPsw="showPswAgain" />
      </div>
      <!-- <button class="button-submit">Sign In</button> -->
      <a href="#" @click="register">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ $t('messages.register') }}
      </a>
      <p class="p">{{ $t('messages.haveAccount') }} <span class="span" @click="changeLoginOrRegister">{{
      $t('messages.login') }}</span>

      </p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register_form {
  width: 390px;
  height: 654px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #e0e0e0;
    padding: 30px;
    width: 390px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #767676;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column>label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #151717;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;

    button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background: #183153;
      // font-family: "Montserrat", sans-serif;
      // box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
      // overflow: hidden;
      cursor: pointer;
      border: none;
      height: 48px;
      width: 144px;
    }

    button:after {
      content: " ";
      width: 0%;
      height: 100%;
      background: #ffd401;
      position: absolute;
      transition: all 0.4s ease-in-out;
      border-radius: 5px;
      right: 0;
    }

    button:hover::after {
      right: auto;
      left: 0;
      width: 100%;
    }

    button span {
      // text-align: center;
      text-decoration: none;
      // width: 100%;
      // padding: 18px 25px;
      color: #fff;
      // font-size: 1.125em;
      // font-weight: 500;
      // letter-spacing: 0.2em;
      z-index: 20;
      transition: all 0.3s ease-in-out;
      // border-radius: 5px;
    }

    button:hover span {
      color: #183153;
      animation: scaleUp 0.3s ease-in-out;
      border-radius: 5px;
    }

    @keyframes scaleUp {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(0.95);
      }

      100% {
        transform: scale(1);
      }
    }

  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background-color: #e0e0e0;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row>div>label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  #heading {
    text-align: center;
    color: black;
    margin: 5px 0;
  }

  a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #151717;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px;
    text-align: center;
  }

  a:hover {
    background: #91c5ef;
    color: #272727;
    border-radius: 5px;
  }

  a span {
    position: absolute;
    display: block;
  }

  a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #151717);
    animation: btn-anim1 1.5s linear infinite;
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

  a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #151717);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }

    50%,
    100% {
      top: 100%;
    }
  }

  a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #151717);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }

    50%,
    100% {
      right: 100%;
    }
  }

  a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #151717);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }

    50%,
    100% {
      bottom: 100%;
    }
  }
}
</style>