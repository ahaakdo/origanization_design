<script lang="ts" setup>
import { ref } from 'vue';
import type { LoginForm } from '../type/index'
import { ElMessage } from 'element-plus'
import { loginHandler } from '@/apis/user';
import { useRouter } from 'vue-router';
import eyes from './eyes.vue';
import remember from './remember.vue'
import forget from './forget.vue'
import { useUserStore } from '@/stores/index';
// import { useI18n } from 'vue-i18n';
const stores = useUserStore()
const router = useRouter()
// const { t } = useI18n()
//定义登录表单信息
const loginForm = ref<LoginForm>({
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
  remember: false
})
//登录操作
const login = async () => {
  // console.log(11);
  if (loginForm.value.username === '' || loginForm.value.password === '') {
    ElMessage.error('用户名和密码不能为空')
  } else {
    await loginHandler({ user_username: loginForm.value.username, user_password: loginForm.value.password }).then((res) => {
      ElMessage.success('登陆成功')
      console.log(res.data.token);
      stores.setToken(res.data.token)
      // localStorage.setItem('token', res.data.token)
      if (loginForm.value.remember) {
        localStorage.setItem('username', loginForm.value.username)
        localStorage.setItem('password', loginForm.value.password)
      }
      setTimeout(() => {
        router.replace('/')
      }, 1000)
    }).catch((err) => {
      console.log(err);
    })

  }
}
//子传父
const emits = defineEmits(['changeWays'])
//更换登录or注册
const changeLoginOrRegister = () => {
  emits('changeWays', 'Register')
}
//密码显示
const psw = ref<'password' | 'text'>('password')
const showPsw = (val: boolean) => {
  if (val) {
    psw.value = 'text'
  } else {
    psw.value = 'password'
  }
}
//记住密码
const handleRemember = (val: boolean) => {
  loginForm.value.remember = val
}
//弹出框显示隐藏
const visible = ref(false)
const closeDialog = () => {
  visible.value = false
}
</script>

<template>
  <div class="login_form">
    <h1 id="heading">{{ $t('messages.login') }}</h1>
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
        <input type="text" v-focus class="input" v-model="loginForm.username"
          :placeholder="$t('messages.enterUsername')">
      </div>

      <div class="flex-column">
        <label>{{ $t('messages.password') }} </label>
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
        <input :type="psw" v-model="loginForm.password" class="input" :placeholder="$t('messages.enterPassword')">
        <eyes @showPsw="showPsw" />
      </div>

      <div class="flex-row">
        <remember @checked="handleRemember" />
        <span class="span" @click="visible = true">{{ $t('messages.forget') }}</span>
      </div>
      <!-- <button class="button-submit">Sign In</button> -->
      <a href="#" @click="login" v-throttle>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ $t('messages.login') }}
      </a>
      <p class="p">{{ $t('messages.account') }}
        <span class="span" @click="changeLoginOrRegister">{{
      $t('messages.signUp') }}</span>
      </p>
    </form>
    <forget v-model="visible" @close="closeDialog" />
  </div>
</template>

<style lang="scss" scoped>
.login_form {
  width: 390px;
  height: 554px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: var(--box-shadow);
  display: flex;
  // display: none;
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