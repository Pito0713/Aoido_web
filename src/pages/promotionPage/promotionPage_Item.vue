<script setup>
import {ref, reactive, onMounted, onUnmounted} from 'vue'
const props = defineProps({
  foo: String | Number
})
</script>

<template>
  <div class="promotionPage_Item_container">
    {{ foo }}
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>