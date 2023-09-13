<script setup>
import { ref, inject, watch } from 'vue'
const categoryList = inject('categoryList');
const callCategoryFilter = inject('callCategoryFilter');
const paginationValue = inject('paginationValue');
const pagination_LIST = [
  { value: 12, lang: 12 },
  { value: 24, lang: 24 },
  { value: 48, lang: 48 },
];

const selectedCityOption = ref('全部')

watch(selectedCityOption, (newVal, oldVal) => {
  callCategoryFilter(newVal)
});
</script>

<template>
  <div class="category_container">
    <div style="display: flex; justify-content:center; align-items:center;  margin-right: 20px;">
      <a style="width: 85px; font-size: 1.25rem;"> {{ $t('商品分類') }} / </a>
      <select class="select_container" v-model="selectedCityOption">
        <option v-for="(option, index) in categoryList.data" :key="index" :value="option.category">
          <div class="prodcutPage_category_item">
            {{ option.category }}
          </div>
        </option>
      </select>
    </div>

    <div style="display: flex; justify-content:center; align-items:center;  margin-right: 20px;">
      <a style="width: 85px; font-size: 1.25rem;"> {{ $t('每分頁數量') }} : </a>
      <select class="select_container" v-model="paginationValue">
        <option v-for="(option, index) in pagination_LIST" :key="index" :value="option.value">
          <div class="prodcutPage_category_item">
            {{ option.lang }}
          </div>
        </option>
      </select>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>