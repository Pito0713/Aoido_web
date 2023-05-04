<script setup>
import { ref, onMounted } from 'vue'
import chartPage_Item from './chartPage_Item.vue'
import chartPage_subInfo from './chartPage_subInfo.vue'
import Service from "../../service/service";
import pagination from '../../components/pagination/pagination.vue';
import Cookies from 'js-cookie';
import { useStore } from '../../store/main';

const store = useStore();

const List = [
  { item: 123 },
  { item: 4565 },
  { item: 78459 },
  { item: 101112 },
]

const page = ref(1)
const onPageChange = (val) => {
  page.value = val
}

const postChartData = async (submitData) => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let response = await Service.postChartData({ token: token });
  if (response) List.data = response.data
  store.isloadingChange(false)
};

onMounted(() => {
  postChartData()
});

</script>

<template>
  <div class="chartPage">
    <div class="container">
      <chartPage_subInfo class="chartPage_subInfo" />
      <div class="chartPage_Item">
        <template v-for="(item, index) in List">
          <chartPage_Item :foo=item.item />
        </template>
        <pagination class="chartPage_Item_pagination" :page="page" @onPageChange="onPageChange" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>