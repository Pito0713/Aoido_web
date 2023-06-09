<script setup>
import { ref, onMounted, reactive, provide, watch } from 'vue'
import prodcutPage_coupon from './prodcutPage_coupon.vue';
import prodcutPage_category from './prodcutPage_category.vue';
import pagination from '@COM/pagination/pagination.vue';
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';

const store = useStore();
const searchText = ref('')
const page = ref(1)
const paginationValue = ref(50)
const category = ref([])
const isSort = ref('asc')
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
    searchText: searchText.value,
    category: category.value,
    page: val,
    pagination: paginationValue.value,
    isSort: isSort.value,
  };
  postProductDatabase(submitData)
}

const callCategoryFilter = (value) => {
  category.value = [value]
  page.value = 1
  let submitData = {
    searchText: searchText.value,
    category: [value],
    page: page.value,
    pagination: paginationValue.value,
    isSort: isSort.value,
  };
  postProductDatabase(submitData)
};

const callPriceFilter = () => {
  isSort.value = isSort.value === 'asc' ? 'desc' : 'asc';
};

const callSearch = () => {
  let submitData = {
    searchText: searchText.value,
    category: category.value,
    page: page.value,
    pagination: paginationValue.value,
    isSort: isSort.value,
  };
  postProductDatabase(submitData)
};

onMounted(() => {
  postProductDatabase({
    searchText: '',
    category: [],
    page: page.value,
    pagination: paginationValue.value,
    isSort: isSort.value,
  })
  postProductFilter()
});

watch(isSort, (newVal, oldVal) => {
  postProductDatabase({
    searchText: searchText.value,
    category: category.value,
    page: page.value,
    pagination: paginationValue.value,
    isSort: isSort.value,
  })
});

provide('categoryList', categoryList);
provide('callCategoryFilter', callCategoryFilter);


</script>

<template>
  <div class="prodcutPage_container">
    <div>
      <div class="prodcutPage_category">
        <prodcutPage_category />
        <div>
          <button style="width: 175px;" class="prodcutPage_category_container" @click="callPriceFilter()">
            <img src="../../assets/filter.png" />
            <template v-if="isSort === 'asc'">
              <a>価格が低い順</a>
            </template>
            <template v-else>
              <a>価格が高い順</a>
            </template>
          </button>
          <div style="width: 175px;" class="prodcutPage_category_container">
            <input type="text" v-model="searchText" @keydown.enter="callSearch" />
            <button @click="callSearch">
              <img class="prodcutPage_category_img" src="../../assets/search.png" />
            </button>
          </div>
        </div>

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
      <div class="prodcutPage_pagination">
        <pagination :page="page" @onPageChange="onPageChange" />
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>