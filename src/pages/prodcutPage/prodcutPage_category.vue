<script setup>
import { ref, inject, watch } from 'vue'
const categoryList = inject('categoryList');
const callCategoryFilter = inject('callCategoryFilter');

const selectedCityOption = ref('全部')

watch(selectedCityOption, (newVal, oldVal) => {
  callCategoryFilter(newVal)
});
</script>

<template>
  <select class="prodcutPage_category_container select_container" v-model="selectedCityOption">
    <option v-for="(option, index) in categoryList.data" :key="index" :value="option.category">
      <div class="prodcutPage_category_item">
        {{ option.category }}
      </div>
    </option>
  </select>
</template>

<style lang="scss" scoped>
@import "./style";
</style>