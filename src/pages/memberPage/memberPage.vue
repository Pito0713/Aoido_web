<script setup>
import memberPage_Item from './memberPage_Item.vue';

const List = [
  { item: 'name' },
  { item: 'birth' },
  { item: 'phone' },
  { item: 'address' },
  { item: 'mail' },
]

</script>

<template>
  <div class="memberPage_container">
    <div class="memberPage_Item">
      <template v-for="(item, index) in List">
        <memberPage_Item :foo=item.item />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>