<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

import { useRouter } from 'vue-router'
const props = defineProps({
  data: {}
})


const expanded = ref(false);
const router = useRouter()
const toggle = () => {
  expanded.value = !expanded.value
}
const handleClick = () => {
  router.push({ name: 'prodcutPage_Detail', params: { id: props.data._id }, query: props.data });
}
</script>

<template>
  <div class="prodcutPage_coupon_content">
    <div class="prodcutPage_coupon_container">
      <div class="prodcutPage_coupon_info">
        <div class="prodcutPage_coupon_img">
          <img class="pagination_Arrow" :src="data.imageUrl" />
        </div>
        <div class="prodcutPage_coupon_describe">
          <div>
            <a class="prodcutPage_coupon_text"> {{ data.describe }} </a>
          </div>
          <div>
            <a class="prodcutPage_coupon_text"> $ {{ data.price }} </a>
          </div>
        </div>
      </div>
      <button class="prodcutPage_coupon_button" @click="toggle()">add</button>
    </div>
    <div class="accordion-content">
      <div class="accordion-content_img"></div>
      <button class="accordion-content_button" @click="handleClick()">Detail</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>