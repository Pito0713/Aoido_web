<script setup>
const props = defineProps({
  errors: Object,
  msg: String
})
</script>

<template>
  <ol v-if="errors.$error" class="form-errors ">
    <li> {{ props.errors.$errors[0].$message }} </li>
  </ol>
</template>

<style lang="scss" scoped>
@import "./style";
</style>