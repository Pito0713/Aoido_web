<script setup>
const props = defineProps({
  msg: String | Number
})
</script>

<template>
  <div class="titleContainer">
    <div class="TitleDot"></div>
    <a class="titleText"> {{ msg }} </a>
    <div class="TitleDot"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>