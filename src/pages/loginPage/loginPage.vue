<script setup>
import { ref, reactive, watch } from 'vue'
import Service from "@SERVICE/service";
import Cookies from 'js-cookie';
import formerrors from '@COM/form-errors/index.vue'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '@STORE/main';
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter()

const isShowPassword = ref(false)
const showPasswordValue = ref(false)
const infoData = reactive({
  account: '',
  password: '',
});

const rules = {
  account: {
    required: helpers.withMessage('必須入力', required),
    maxLength: helpers.withMessage(
      '最大12桁',
      maxLength(12),
    ),
    minLength: helpers.withMessage(
      '最低3桁',
      minLength(3),
    ),
  },
  password: {
    required: helpers.withMessage('必須入力', required),
    maxLength: helpers.withMessage(
      '最大12桁',
      maxLength(12),
    ),
    minLength: helpers.withMessage(
      '最低3桁',
      minLength(3),
    ),
  },
}

const v$ = useVuelidate(rules, infoData)

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

    const LogInCheckTransform = document.getElementById('LogInCheckTransform');
    LogInCheckTransform.style.transform = `translate3d(${mathX}px, ${mathY}px, ${mathZ}px)`

    if (v$.value.account.$error) keyframe('loginPage_account')
    if (v$.value.password.$error) keyframe('loginPage_password')
  } else {
    store.isloadingChange(true)
    let submitData = {
      account: infoData.account,
      password: infoData.password,
    };
    const response = await Service.postLogin(submitData);

    if (response?.status === 'success' && response?.data) {
      Cookies.set('account', response.data.user.account);
      Cookies.set('password', response.data.user.password);
      Cookies.set('token', response.data.user.token);
      Cookies.set('id', response.data.user.id);
      router.push('/homePage');
    }
    store.isloadingChange(false)
  }
}

const createMember = async () => {
  router.push('/createMember');
}

const isCheckPassword = async () => {
  v$.value.$touch();

  if (v$.value.account.$error) keyframe('loginPage_account')
  else {
    isShowPassword.value = true
  }
}

const showPasswordChage = async () => {
  showPasswordValue.value = !showPasswordValue.value
}


watch(infoData, (newVal, oldVal) => {
  if (isShowPassword && ['', null, undefined].includes(newVal.account)) {
    isShowPassword.value = false
  }
})
</script>

<template>
  <div class="loginPage">
    <div class="loginPage_button_group">
      <button class="loginPage_button" type="button" @click="createMember()">
        <a style="font-size: 0.85rem;">
          新規アカウント登録
        </a>
      </button>
      <template v-if="!isShowPassword">
        <button class="loginPage_button_Img" type="button" @click="isCheckPassword()">
          <img src='../../assets/logIn_active.svg' alt="" />
          <a style="font-size: 0.85rem;">入力</a>
        </button>
      </template>
    </div>

    <div class="loginPage_content" id="loginPage_account">
      <a class="loginPage_text">アカウント</a>
      <div>
        <div class="loginPage_input_group">
          <input class="loginPage_input" v-model="v$.account.$model" placeholder='アカウント入力' />
          <div>
            <img src='' alt="" />
          </div>
        </div>
        <formerrors :errors="v$.account" />
      </div>
    </div>

    <transition name="fade">
      <template v-if="isShowPassword">
        <div class="loginPage_content" id="loginPage_password">
          <a class="loginPage_text">パスワード</a>
          <div>
            <div class="loginPage_input_group">
              <input :type="showPasswordValue ? 'text' : 'password'" class="loginPage_input" v-model="v$.password.$model"
                placeholder='パスワード入力' />
              <div @click="showPasswordChage()">
                <template v-if="showPasswordValue">
                  <img src='../../assets/eye.svg' alt="" />
                </template>
                <template v-if="!showPasswordValue">
                  <img src='../../assets/eye_off.svg' alt="" />
                </template>
              </div>
            </div>
            <formerrors :errors="v$.password" />
          </div>
        </div>
      </template>
    </transition>

    <template v-if="isShowPassword">
      <div class="loginPage_content" style="margin-top: 4rem;">
        <transition>
          <button class="loginPage_button" type="button" id="LogInCheckTransform" @click="onLogInCheck()">
            <a style="font-size: 0.9rem;">ログイン</a>
          </button>
        </transition>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>