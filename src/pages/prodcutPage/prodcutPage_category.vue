<script setup>
const props = defineProps({
  data: String | Number,
  callFilter: Function
})

</script>

<template>
  <template v-for="(item, index) in props.data.data">
    <div class="prodcutPage_category_item" @click="props.callFilter(item.category)">
      {{ item.category }}
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import "./style";
</style>