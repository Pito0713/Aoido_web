<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  foo: String | Number
})
</script>

<template>
  <div class="chartPage_Item_content">
    <div class="chartPage_Item_name">
      <a>
        {{ foo }}
      </a>
    </div>
    <div class="chartPage_Item_store">
      <button>
        <img class="chartPage_Item_img" src="../../assets/filter.png" />
      </button>
      <a>
        {{ 1 }}
      </a>
      <button>
        <img class="chartPage_Item_img" src="../../assets/plus.png">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>