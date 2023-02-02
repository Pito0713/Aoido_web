<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  foo: String | Number
})
</script>

<template>
  <div class="chartPage_Item_content">
    <div class="chartPage_Item_text">
      <a>
        {{ foo }}
      </a>
    </div>
    <div class="chartPage_Item_store">
      <button>
        <img class="chartPage_Item_img" src="../../assets/filter.png" />
      </button>
      <div class="chartPage_Item_text">
        <a>
          {{ 1 }}
        </a>
      </div>
      <button>
        <img class="chartPage_Item_img" src="../../assets/plus.png">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>