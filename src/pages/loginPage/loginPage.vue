<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import formerrors from '../../components/form-errors/index.vue'
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();

const isCheck = ref(false)
const ListData = reactive({
  name: '',
  password: '',
});

const rules = {
  name: { required },
  password: { required },
}

const v$ = useVuelidate(rules, ListData)

const keyframe = (e) => {
  document.getElementById(e).animate([
    { transform: `translate3d(-1px, 0, 0)` },
    { transform: `translate3d(2px, 0, 0)` },
    { transform: `translate3d(-4px, 0, 0)` },
    { transform: `translate3d(4px, 0, 0)` },
    { transform: `translate3d(-4px, 0, 0)` },
    { transform: `translate3d(4px, 0, 0)` },
    { transform: `translate3d(2px, 0, 0)` },
    { transform: `translate3d(-1px, 0, 0)` },
  ], {
    duration: 500,
  });
}

const onLogInCheck = () => {
  v$.value.$touch();

  if (v$.value.$error) {
    let mathX = Math.random() * 100
    let mathY = Math.random() * 100
    let mathZ = Math.random() * 50

    const LogInCheck = document.getElementById('LogInCheck');
    LogInCheck.style.transform = `translate3d(${mathX}px, ${mathY}px, ${mathZ}px)`


    if (v$.value.name.$error) keyframe('loginPage_name1')
    if (v$.value.password.$error) keyframe('loginPage_password')
  } else {
    store.isCheckLoginChange(true)
    isCheck.value = !isCheck.value
  }
}
</script>

<template>
  <div class="loginPage">
    <div class="loginPage_content" id="loginPage_name1">
      <a class="loginPage_text">name</a>
      <div class="loginPage_name">
        <input class="loginPage_input" v-model="v$.name.$model" placeholder='name' />
        <formerrors :errors="v$.name" />
      </div>
    </div>
    <div>
      <div class="loginPage_content" id="loginPage_password">
        <a class="loginPage_text">password</a>
        <div>
          <input class="loginPage_input" v-model="v$.password.$model" placeholder='password' />
          <formerrors :errors="v$.password" />
        </div>
      </div>
    </div>
    <div class="loginPage_button_group">
      <transition>
        <button class="loginPage_button" :class="{ loginButton: isCheck }" type="button" id="LogInCheck"
          @click="onLogInCheck()">Revise</button>

      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>