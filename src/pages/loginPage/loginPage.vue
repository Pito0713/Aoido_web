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
  account: '',
  password: '',
});

const rules = {
  account: { required },
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


    if (v$.value.account.$error) keyframe('loginPage_account')
    if (v$.value.password.$error) keyframe('loginPage_password')
  } else {
    store.isloadingChange(true)
    let submitData = {
      account: ListData.account,
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
    store.isloadingChange(false)
  }
}

const createMember = async () => {
  router.push('/createMember');
}
</script>

<template>
  <div class="loginPage">
    <div class="loginPage_button_group">
      <button type="button" @click="createMember()">新規アカウント登録</button>
    </div>
    <div class="loginPage_content" id="loginPage_account">
      <div style="display: flex; justify-content: center; align-items: center;">
        <a class="loginPage_text">アカウント</a>
        <div class="loginPage_account">
          <input class="loginPage_input" v-model="v$.account.$model" placeholder='account' />
          <formerrors :errors="v$.account" msg="必須入力" />
        </div>
      </div>

    </div>
    <div class="loginPage_content" id="loginPage_password">
      <div style="display: flex;justify-content: center;
    align-items: center;">
        <a class="loginPage_text">パスワード</a>
        <div>
          <input class="loginPage_input" v-model="v$.password.$model" placeholder='password' />
          <formerrors :errors="v$.password" msg="必須入力" />
        </div>
      </div>
    </div>

    <div class="loginPage_button_group">
      <transition>
        <button class="loginPage_button" :class="{ loginButton: isCheck }" type="button" id="LogInCheck"
          @click="onLogInCheck()">ログイン</button>
      </transition>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>