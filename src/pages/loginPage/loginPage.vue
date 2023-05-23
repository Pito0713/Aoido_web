<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import formerrors from '@COM/form-errors/index.vue'
import { useStore } from '@STORE/main';
import Service from "@SERVICE/service";
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter()

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

const onLogInCheck = async () => {

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
    let submitData = {
      account: ListData.name,
      password: ListData.password,
    };
    const response = await Service.postLogin(submitData);

    if (response?.status === 'success' && response?.data) {
      Cookies.set('account', response.data.user.account);
      Cookies.set('password', response.data.user.password);
      Cookies.set('token', response.data.user.token);
      Cookies.set('id', response.data.user.id);
      router.push('/homePage');
    } else {
      store.isNotificationChange(true);
      store.NotificationMessageChange(response.message)
    }
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
        <!-- <button class="chartPage_subInfo_button" type="button"
          @click="handChange(); ">save</button> -->

        <button class="loginPage_button" :class="{ loginButton: isCheck }" type="button" id="LogInCheck"
          @click="onLogInCheck()">Revise</button>

      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>