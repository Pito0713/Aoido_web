<script setup>
import memberPageInfo from './memberPageInfo.vue';
import memberPageCoupon from './memberPageCoupon.vue';
import memberPageSetting from './memberPageSetting.vue';
import headIcon from '@COM/head-icon/headIcon.vue';
import titleDot from '@COM/title-dot/title-dot.vue';
</script>

<template>
  <headIcon />
  <div class="memberPage_container">
    <titleDot msg='個人資料' />
    <memberPageInfo></memberPageInfo>
    <titleDot msg='優惠卷' />
    <memberPageCoupon></memberPageCoupon>
    <titleDot msg='設定' />
    <memberPageSetting></memberPageSetting>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>