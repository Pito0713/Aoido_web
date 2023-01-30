<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  msg: String | Number
})
</script>

<template>
  <div>
    <div class="TitleDot"></div>
    <h1> {{ msg }} </h1>
    <div class="TitleDot"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>