<script setup>
import prodcutPage_Item from './prodcutPage_Item.vue';
import prodcutPage_category from './prodcutPage_category.vue';
const List = [
  { item: 123 },
  { item: 456 },
  { item: 789 },
  { item: 101112 },
  { item: 131415 },
]

const categoryList = [
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
]

</script>

<template>
  <div class="prodcutPage_container">
    <div class="prodcutPage_category">
      <template v-for="(item, index) in categoryList">
        <prodcutPage_category :foo=item.item />
      </template>
    </div>
    <div class="prodcutPage_Item">
      <template v-for="(item, index) in List">
        <prodcutPage_Item :foo=item.item />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>