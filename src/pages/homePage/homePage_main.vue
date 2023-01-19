<script setup>
import {ref, reactive, onMounted, onUnmounted} from 'vue'
import homePage_main_prouduct_item from './homePage_main_prouduct_item.vue'
import homePage_main_prouduct_describe from './homePage_main_prouduct_describe.vue'
</script>

<template>
  <div class="homePage_main">
  <div class="homePage_main_title">
    <div class="TitleDot"></div>
    <h1> template </h1>
    <div class="TitleDot"></div>
  </div>
  <div class="homePage_main_prouduct">
    <homePage_main_prouduct_describe />
    <homePage_main_prouduct_item/>
  </div>
  <div class="homePage_main_title">
    <div class="TitleDot"></div>
    <h1> template </h1>
    <div class="TitleDot"></div>
  </div>
  <div class="homePage_main_describe">
    <div class="homePage_main_describe_itemContainer">12</div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>