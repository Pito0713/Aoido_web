<script setup>
import chartPage_Item from './chartPage_Item.vue'
import chartPage_subInfo from './chartPage_subInfo.vue'
import service from '../../service/service'
const List = [
  { item: 123 },
  { item: 4565 },
  { item: 78459 },
  { item: 101112 },
  { item: 131415 },
]
console.log(service, 45646)
service.post(
  `/productFilter`, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTIzIiwiaWF0IjoxNjY3OTAwNzI3fQ.qvdhXmQjIApmdcRCT2NxxtWoaGwxZq2JNbEX8icvE3w' },
);
</script>

<template>
  <div class="chartPage">
    <chartPage_subInfo class="chartPage_subInfo" />
    <div class="chartPage_Item">
      <template v-for="(item, index) in List">
        <chartPage_Item :foo=item.item />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>