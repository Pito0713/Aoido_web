<script setup>
import memberPageInfo from './memberPageInfo.vue';
import memberPageCoupon from './memberPageCoupon.vue';
import Cookies from 'js-cookie';
import titleDot from '@COM/title-dot/title-dot.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const logOut = () => {
  Cookies.remove('password');
  Cookies.remove('token');

  router.push('/loginPage');
}
</script>

<template>
  <div class="memberPage_container">
    <titleDot msg='かいいんじょうほう' />
    <memberPageInfo></memberPageInfo>
    <titleDot msg='クーポン' />
    <memberPageCoupon></memberPageCoupon>
    <div class="memberPage_logout_button">
      <button type="button" @click="logOut()">
        <a>ログアウト</a>
        <img style="width: 15px; height: 15px;" src="../../assets/logOut.svg">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>