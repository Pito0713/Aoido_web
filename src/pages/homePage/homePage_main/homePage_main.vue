<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import homePage_main_prouduct from './homePage_main_prouduct.vue'
import homePage_main_about from './homePage_main_about.vue'
import homePage_main_title from './homePage_main_title.vue'
import homePage_main_discount from './homePage_main_discount.vue'
</script>

<template>
  <div class="homePage_main">
    <homePage_main_title class="homePage_main_title" msg='template' />
    <homePage_main_prouduct class="homePage_main_prouduct" />
    <homePage_main_title class="homePage_main_title" msg='about' />
    <homePage_main_about class="homePage_main_about" />
    <homePage_main_title class="homePage_main_title" msg='template' />
    <homePage_main_discount class="homePage_main_discount" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>