<script setup>
import { ref, reactive, watch } from 'vue'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'
import formerrors from '@COM/form-errors/index.vue'
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '@STORE/main';
import Service from "@SERVICE/service";


const store = useStore();
const router = useRouter()

const isShowPassword = ref(false)
const showPasswordValue = ref(false)
const infoData = reactive({
  account: '',
  password: '',
});

// validate rules
const rules = {
  account: {
    required: helpers.withMessage('必填', required),
  },
  password: {
    required: helpers.withMessage('必填', required),
  },
}
const v$ = useVuelidate(rules, infoData)


// keyframe animations for input fields
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

    // keyframe animations for login button
    let mathX = Math.random() * 100
    let mathY = Math.random() * 100
    let mathZ = Math.random() * 50
    const LogInCheckTransform = document.getElementById('LogInCheckTransform');
    LogInCheckTransform.style.transform = `translate3d(${mathX}px, ${mathY}px, ${mathZ}px)`

    // keyframe animations for input fields
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

//  account inValue update passwordfiled show
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


// watch for changes
watch(infoData, (newVal, oldVal) => {
  if (isShowPassword && ['', null, undefined].includes(newVal.account)) {
    isShowPassword.value = false
  }
})
</script>

<template>
  <div class="loginPage">
    <img class="logPage_themeIcon" src="../../assets/theme.svg" />
    <div class="loginPage_button_group">
      <button class="loginPage_createMember_button" type="button" @click="createMember()">
        <a>
          {{ $t('註冊帳號') }}
        </a>
      </button>
    </div>
    <div class="loginPage_content" id="loginPage_account">
      <a class="loginPage_text">{{ $t('帳號') }}</a>
      <div style="border-bottom: 1px var(--border-color) solid;">
        <div class="loginPage_input_group">
          <input class="loginPage_input" v-model="v$.account.$model" />
          <button type="button" @click="isCheckPassword()">
            <template v-if="!isShowPassword">
              <div class="loginPage_accout_img">
                <img src='../../assets/logIn_arrow.svg' alt="logIn_arrow" />
              </div>
            </template>
            <template v-else>
              <div style="width: 37.5px; height: 25px;" />
            </template>
          </button>
        </div>
      </div>
      <formerrors :errors="v$.account" />
    </div>
    <transition name="fade">
      <template v-if="isShowPassword">
        <div class="loginPage_content" id="loginPage_password">
          <a class="loginPage_text">{{ $t('密碼') }}</a>
          <div style="border-bottom: 1px var(--border-color) solid;">
            <div class="loginPage_input_group">
              <input class="loginPage_input" :type="showPasswordValue ? 'text' : 'password'"
                v-model="v$.password.$model" />
              <div @click="showPasswordChage()">
                <template v-if="showPasswordValue">
                  <img style="width: 25px; height: 25px;" src='../../assets/eye.svg' alt="eye" />
                </template>
                <template v-if="!showPasswordValue">
                  <img style="width: 25px; height: 25px;" src='../../assets/eye_off.svg' alt="eye_off" />
                </template>
              </div>
            </div>
          </div>
          <formerrors :errors="v$.password" />
        </div>
      </template>
    </transition>
    <template v-if="isShowPassword">
      <div class="loginPage_content" style="margin-top: 4rem;">
        <transition>
          <button class="loginPage_button_Img" type="button" id="LogInCheckTransform" @click="onLogInCheck()">
            <a>{{ $t('登入') }}</a>
          </button>
        </transition>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>