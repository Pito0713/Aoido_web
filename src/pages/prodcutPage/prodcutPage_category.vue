<script setup>
import { inject } from 'vue'
const categoryList = inject('categoryList');
const callCategoryFilter = inject('callCategoryFilter');
</script>

<template>
  <template v-for="(item, index) in categoryList.data">
    <div class="prodcutPage_category_item" @click="callCategoryFilter(item.category)">
      {{ item.category }}
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import "./style";
</style>