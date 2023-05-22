<script setup>
import memberPage_title from './memberPage_title.vue';
import memberPageInfo from './memberPageInfo.vue';
import memberPageCoupon from './memberPageCoupon.vue';
import Cookies from 'js-cookie';

const logOut = () => {
  Cookies.remove('password');
  Cookies.remove('token');
}
</script>

<template>
  <div class="memberPage_container">
    <memberPage_title class="memberPage_title" msg='かいいんじょうほう' />
    <memberPageInfo></memberPageInfo>
    <memberPage_title class="memberPage_title" msg='クーポン' />
    <memberPageCoupon></memberPageCoupon>
    <div class="memberPage_logout_button">
      <button type="button" @click="logOut()">ログアウト</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>