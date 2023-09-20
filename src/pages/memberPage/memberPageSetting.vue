<script setup>
import { ref, watch } from 'vue'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'

import { useStore } from '@STORE/main';
import { LANGUAGE_LIST } from '@CONFIGS/site'

const router = useRouter()
const store = useStore();

// loacal storage
const selectedlanguage = ref(Cookies.get('language'))

// router for page
const handleClickHandPassWord = () => {
  router.push({ name: 'memberPage_handPassWord' });
}
const handleClickInfoSetting = () => {
  router.push({ name: 'memberPage_info_setting' });
}

// function
const logOut = () => {
  Cookies.remove('password');
  Cookies.remove('token');

  router.push('/loginPage');
}

// watch for changes
watch(selectedlanguage, (newValue, oldValue) => {
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) {
    store.defaultLanguageChange(newValue)
  }
});
</script>

<template>
  <div class="memberPage_setting_content">
    <div class="memberPage_setting_content_button">
      <button type="button" @click="handleClickInfoSetting()">
        <a>{{ $t('個人資料變更') }}</a>
      </button>
    </div>
    <div class="memberPage_setting_content_button">
      <button type="button" @click="handleClickHandPassWord()">
        <a>{{ $t('密碼變更') }}</a>
      </button>
    </div>
    <div class="memberPage_setting_content_button">
      <label class="memberPage_language">
        <div class="memberPage_language_input">
          <a class="memberPage_language_label">{{ $t('語言') }}</a>
          <select v-model="selectedlanguage">
            <option v-for="(item, index) in LANGUAGE_LIST" :key="index" :value="item.value">
              {{ item.lang }}
            </option>
          </select>
        </div>
      </label>
    </div>

    <div class="memberPage_setting_content_button">
      <button type="button" @click="logOut()">
        <a>{{ $t('登出') }}</a>
        <img src="../../assets/logOut.svg">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>