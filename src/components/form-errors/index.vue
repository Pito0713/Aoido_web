<script setup>
const props = defineProps({
  errors: Object,
  msg: String
})
console.log(props.msg)
</script>

<template>
  <ol v-if="errors.$error" class="form-errors ">
    <li> {{ props.msg }} </li>
  </ol>
</template>

<style lang="scss" scoped>
@import "./style";
</style>