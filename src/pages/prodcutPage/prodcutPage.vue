<script setup>
import prodcutPage_Item from './prodcutPage_Item.vue';
const List = [
  {item: 123},
  {item: 456},
  {item: 789},
  {item: 101112},
  {item: 131415},
]

</script>

<template>
  <div class="prodcutPage_container">
    <template  v-for="(item, index) in List" >
      <prodcutPage_Item :foo=item.item />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>