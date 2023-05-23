<script setup>
import { ref, onMounted, reactive } from 'vue'
import prodcutPage_coupon from './prodcutPage_coupon.vue';
import prodcutPage_category from './prodcutPage_category.vue';
import pagination from '@COM/pagination/pagination.vue';
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';

const store = useStore();
const page = ref(1)
const paginationValue = ref(50)
const category = ref([])
const List = reactive({
  data: {},
});

const categoryList = reactive({
  data: {},
});

const postProductDatabase = async (submitData) => {
  store.isloadingChange(true)
  let response = await Service.postProductDatabase(submitData);
  if (response?.status === 'success' && response?.data) List.data = response.data
  store.isloadingChange(false)
};

const postProductFilter = async () => {
  let response = await Service.postProductFilter();
  if (response?.status === 'success' && response?.data) categoryList.data = response.data
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

const callFilter = (value) => {
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
</script>

<template>
  <div class="prodcutPage_container">
    <div>
      <div class="prodcutPage_category">
        <prodcutPage_category :data="categoryList" :callFilter="callFilter" />
      </div>
      <div class="prodcutPage_Item">
        <template v-for="(item, index) in List.data">
          <prodcutPage_coupon :data=item />
        </template>
      </div>
    </div>
    <pagination class="prodcutPage_pagination" :page="page" @onPageChange="onPageChange" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>