<script setup>
import { ref, onMounted, reactive } from 'vue'
import Cookies from 'js-cookie';
import chartPage_Item from './chartPage_Item.vue'
import chartPage_subInfo from './chartPage_subInfo.vue'

import { useStore } from '@STORE/main';
import Service from "@SERVICE/service";
import pagination from '@COM/pagination/pagination.vue';


const store = useStore();

const List = reactive({
  data: {},
});
const page = ref(1)

const postChartData = async () => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    token: token,
    page: page.value,
    pagination: 4
  }
  let response = await Service.postChartData(submitData);
  if (response) List.data = response.data
  store.isloadingChange(false)
};

const onPageChange = (val) => {
  page.value = val
  postChartData()
}

onMounted(() => {
  postChartData()
});

</script>

<template>
  <div class="chartPage">
    <div class="container">
      <chartPage_subInfo class="chartPage_subInfo" />
      <div class="chartPage_Item">
        <div style="height: 330px">
          <template v-for="(item, index) in List.data">
            <chartPage_Item :data=item :refresh="() => postChartData()" />
          </template>
        </div>
        <pagination style="height: 30px" class="chartPage_Item_pagination" :page="page" @onPageChange="onPageChange" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>