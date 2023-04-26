<script setup>
defineProps({
  errors: Object
})
</script>

<template>
  <ol v-if="errors.$error" class="form-errors ">
    <li v-if="errors.required"> {{ ('必填') }} </li>
  </ol>
</template>

  
<style lang="scss" scoped>
@import "./style";
</style>