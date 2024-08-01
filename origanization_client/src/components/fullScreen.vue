<script setup lang="ts">
import screenFull from "screenfull";
import { onMounted, ref } from "vue";

const changeScreen=(vul)=>{
    console.log(vul.target.checked);
    if (!vul.target.checked) {
        screenFull.exit()
    } else {
        screenFull.request()
    }
}
onMounted(()=>{
    screenFullFun()
})

const expand = ref({
    display: 'block'
})
const compress = ref({
    display: 'none'
})
const checked = ref(false)
const screenFullFun=()=> {
    //监听f11事件
    // window.addEventListener("keydown", (event) => {
    //   if(event.key==='F11' && !screenFull.isFullscreen){
    //     expand.value.display = 'none'
    //     compress.value.display = 'block'
    //   }
    // }); 
    window.addEventListener("resize", (event) => {
      console.log(screenFull.isFullscreen);
      if(!screenFull.isFullscreen){
        expand.value.display = 'block'
        compress.value.display = 'none'
        checked.value=!checked.value
      }else {
        expand.value.display = 'none'
        compress.value.display = 'block'
        checked.value=!checked.value
      }
    }); 
}
</script>

<template>
    <label class="full">
      <input type="checkbox" :checked="checked" @change="changeScreen">
        <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="expand" :style="expand"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path></svg>
        <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="compress" :style="compress"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"></path></svg>
    </label>
</template>

<style lang="scss" >
.full {
  --color: #a5a5b0;
  --size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: var(--size);
  user-select: none;
  fill: var(--color);
}

.full .expand {
  position: absolute;
  animation: keyframes-fill .5s;
}

.full .compress {
  position: absolute;
  display: none;
  animation: keyframes-fill .5s;
}

/* ------ On check event ------ */
.full input:checked ~ .expand {
  display: none;
}

.full input:checked ~ .compress {
  display: block;
}

/* ------ Hide the default checkbox ------ */
.full input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* ------ Animation ------ */
@keyframes keyframes-fill {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
  }
}
</style>