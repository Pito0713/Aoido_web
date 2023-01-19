<script setup>
import {ref, reactive, onMounted, onUnmounted} from 'vue'
const props = defineProps({
  foo: String | Number
})
</script>

<template>
  <div class="prodcutPage_Item_container">
    {{ foo }}
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>