<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  foo: String | Number
})
const categoryList = [
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
]

</script>

<template>
  <template v-for="(item, index) in categoryList">
    <div class="prodcutPage_category_item">
      {{ item.item }}
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import "./style";
</style>