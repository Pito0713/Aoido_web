<script setup>
import { ref } from 'vue'
import promotionPage_Item from './promotionPage_Item.vue';
import pagination from '../../components/pagination/pagination.vue';
const List = [
  { item: 123 },
  { item: 4565 },
  { item: 78459 },
  { item: 101112 },
  { item: 131415 },
]

const page = ref(1)
const onPageChange = (val) => {
  page.value = val
}
</script>

<template>
  <div class="promotionPage_container">
    <div class="promotionPage_Item">
      <template v-for="(item, index) in List">
        <promotionPage_Item :foo=item.item />
      </template>
    </div>
    <pagination :page="page" @onPageChange="onPageChange" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>