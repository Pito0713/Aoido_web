<script setup>
import homePage_main_prouduct from './homePage_main_prouduct.vue'
import homePage_main_about from './homePage_main_about.vue'
import titleDot from '@COM/title-dot/title-dot.vue';
</script>

<template>
  <div class="homePage_main">
    <homePage_main_about />
    <titleDot msg='推薦商品' />
    <homePage_main_prouduct />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>