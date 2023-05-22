<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';
import Cookies from 'js-cookie';

const store = useStore();

import { useRouter } from 'vue-router'
const props = defineProps({
  data: {}
})

const expanded = ref(false);
const router = useRouter()
const toggle = async (_value) => {
  let token = Cookies.get('token')
  store.isloadingChange(true)
  let submitData = {
    id: _value._id,
    token: token,
    count: 1
  }
  let response = await Service.postCreateChart(submitData);
  store.isloadingChange(false)
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
          <div class="prodcutPage_coupon_text">
            <a> {{ data.describe }} </a>
          </div>
          <div class="prodcutPage_coupon_text">
            <a> $ {{ data.price }} </a>
          </div>
        </div>
      </div>
      <button class="prodcutPage_coupon_button" @click="toggle(data)">ついか</button>
    </div>
    <div class="accordion_content">
      <div>
        <div class="accordion_content_info">ぶんるい: {{ data.category }}</div>
        <div class="accordion_content_info"><a>びこう: {{ data.remark }}</a></div>
      </div>
      <button class="accordion_content_button" @click="handleClick()">しょうさい</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>