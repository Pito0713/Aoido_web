<script setup>
import chartPage_Item from './chartPage_Item.vue'
import chartPage_subInfo from './chartPage_subInfo.vue'
const List = [
  { item: 123 },
  { item: 4565 },
  { item: 78459 },
  { item: 101112 },
  { item: 131415 },
]
</script>

<template>
  <div class="chartPage">
    <chartPage_subInfo class="chartPage_subInfo" />
    <div class="chartPage_Item">
      <template v-for="(item, index) in List">
        <chartPage_Item :foo=item.item />
      </template>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>