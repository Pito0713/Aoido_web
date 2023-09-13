<script setup>
import { ref, onMounted, reactive, provide, watch } from 'vue'
import prodcutPage_coupon from './prodcutPage_coupon.vue';
import prodcutPage_category from './prodcutPage_category.vue';
import pagination from '@COM/pagination/pagination.vue';
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useStore();
const searchText = ref('')
const page = ref(1)
const paginationValue = ref(12)
const category = ref([])
const isSort = ref('asc')
const isSearch = ref(false)
const ProductDataList = reactive({
  data: {}
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

const handleClick = () => {
  router.push({ name: 'homePage' });
}

const isSearchContainer = () => {
  isSearch.value = !isSearch.value
}

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

watch(paginationValue, (newVal, oldVal) => {
  callSearch()
});

provide('callSearch', callSearch);
provide('categoryList', categoryList);
provide('callCategoryFilter', callCategoryFilter);
provide('paginationValue', paginationValue);


</script>

<template>
  <div class="prodcutPage_container">
    <div class="prodcutPage_content">
      <div class="prodcutPage_head">
        <button @click="handleClick()">
          <img class="prodcutPage_themeIcon" src="../../assets/theme.svg" />
        </button>

        <div class="prodcutPage_category">
          <div class="prodcutPage_category_searchContainer"
            :class="{ prodcutPage_category_searchContainer_hover: isSearch }">
            <input type="text" v-model="searchText" @keydown.enter="callSearch" />
            <template v-if="!isSearch">
              <button @click="isSearchContainer()">
                <img class="prodcutPage_category_img" src="../../assets/search.svg" />
              </button>
            </template>
            <template v-else>
              <button @click="callSearch">
                <img class="prodcutPage_category_img" src="../../assets/search.svg" />
              </button>
            </template>
          </div>
          <button style="" class="prodcutPage_category_container" @click="callPriceFilter()">
            <img src="../../assets/filter.svg" />
            <template v-if="isSort === 'asc'">
              <a>{{ $t('從價格低排序') }}</a>
            </template>
            <template v-else>
              <a>{{ $t('從價格高排序') }}</a>
            </template>
          </button>
        </div>
      </div>
      <div class="line">
      </div>
      <div>
        <div class="prodcutPage_category">
          <prodcutPage_category />
        </div>
        <div class="prodcutPage_Item">
          <template v-if="ProductDataList?.data?.length > 0" v-for="(item, index) in ProductDataList.data">
            <prodcutPage_coupon :data=item />
          </template>
          <template v-else>
            <div class="prodcutPage_coupon_content">
              <div class="prodcutPage_Item_noData">
                <a>
                  {{ $t('暫無資料') }}
                </a>
              </div>
            </div>
          </template>
        </div>
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