<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  foo: String | Number
})
</script>

<template>
  <div class="promotionPage_Item_container">
    <div class="promotionPage_Item_title">{{ foo }}</div>
    <div class="promotionPage_Item_content">{{ foo }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>