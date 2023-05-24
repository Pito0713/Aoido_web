<script setup>
import { ref, onMounted, reactive, provide } from 'vue'
import prodcutPage_coupon from './prodcutPage_coupon.vue';
import prodcutPage_category from './prodcutPage_category.vue';
import pagination from '@COM/pagination/pagination.vue';
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';

const store = useStore();
const page = ref(1)
const paginationValue = ref(50)
const category = ref([])
const ProductDataList = reactive({
  data: {},
});

const categoryList = reactive({
  data: {},
});

const postProductDatabase = async (submitData) => {
  store.isloadingChange(true)
  let response = await Service.postProductDatabase(submitData);
  if (response?.status === 'success' && response?.data) ProductDataList.data = response.data
  store.isloadingChange(false)
};

const postProductFilter = async () => {
  store.isloadingChange(true)
  let response = await Service.postProductFilter();
  if (response?.status === 'success' && response?.data) categoryList.data = response.data
  store.isloadingChange(false)
};

const onPageChange = (val) => {
  page.value = val
  let submitData = {
    searchText: '',
    category: category.value,
    page: val,
    pagination: paginationValue.value,
  };
  postProductDatabase(submitData)
}

const callCategoryFilter = (value) => {
  category.value = [value]
  page.value = 1
  let submitData = {
    searchText: '',
    category: [value],
    page: page.value,
    pagination: paginationValue.value,
  };
  postProductDatabase(submitData)
};

onMounted(() => {
  postProductDatabase({
    searchText: '',
    category: [],
    page: page.value,
    pagination: paginationValue.value,
  })
  postProductFilter()
});

provide('categoryList', categoryList);
provide('callCategoryFilter', callCategoryFilter);


</script>

<template>
  <div class="prodcutPage_container">
    <div>
      <div class="prodcutPage_category">
        <prodcutPage_category />
      </div>
      <div class="prodcutPage_Item">
        <template v-if="ProductDataList?.data?.length > 0" v-for="(item, index) in ProductDataList.data">
          <prodcutPage_coupon :data=item />
        </template>
        <template v-else>
          <div class="prodcutPage_Item_noData">
            <a>
              データがありません
            </a>
          </div>
        </template>
      </div>
    </div>
    <pagination class="prodcutPage_pagination" :page="page" @onPageChange="onPageChange" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>