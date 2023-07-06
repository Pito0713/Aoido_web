<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import homePage_main_prouduct from './homePage_main_prouduct.vue'
import homePage_main_about from './homePage_main_about.vue'
import titleDot from '@COM/title-dot/title-dot.vue';
</script>

<template>
  <div class="homePage_main">
    <titleDot msg='template' />
    <homePage_main_prouduct />
    <titleDot msg='about' />
    <homePage_main_about />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>