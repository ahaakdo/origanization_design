<script setup>
import { ref } from 'vue';

const isCheck = ref(false)
const emits = defineEmits(['showPsw'])

const showEyes = () => {
  isCheck.value = !isCheck.value
  emits('showPsw', isCheck.value)
}

</script>

<template>
  <label class="eyes">
    <input :checked="isCheck" type="checkbox" @click="showEyes">
    <div class="checkmark"></div>
  </label>
</template>

<style scoped>
.eyes input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.eyes {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  margin-right: 10px;
}

/* Create a custom checkbox */
.checkmark {
  position: relative;
  top: 0;
  left: 0;
  height: 1.4em;
  width: 1.4em;
  border: 2px solid rgb(69, 68, 68);
  border-radius: 1rem 0rem 1rem;
  transform: rotate(45deg);
  transition: all .5s ease-in-out;
  box-shadow: 0px 0px 40px 5px #807f7f;
}

/* When the checkbox is checked, add a blue background */
.eyes input:checked~.checkmark {
  box-shadow: 0px 0px 40px 5px #2196F3;
  border-radius: 1rem 0rem 1rem;
  background-color: #2195f31f;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.eyes input:checked~.checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.eyes .checkmark:after {
  left: 0.35em;
  top: 0.20em;
  width: 0.25em;
  height: 0.5em;
  border: solid #2196F3;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(-5deg);
  animation: upAnimate 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes upAnimate {
  from {
    transform: translate(-20px, -20px) rotate(-5deg);
    border-color: black;
    opacity: 0;
  }

  to {
    transform: translate(0, 0) rotate(-5deg);
    border-color: #2196F3;
    opacity: 1;
  }
}
</style>