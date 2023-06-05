<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter()
const props = defineProps({
  data: {}
})

const addCart = async (_value) => {
  let token = Cookies.get('token')
  if (!['', null, undefined].includes(token)) {
    store.isloadingChange(true)
    let submitData = {
      id: _value._id,
      token: token,
      count: 1
    }
    let response = await Service.postCreateCart(submitData);
    store.isloadingChange(false)
  } else {
    store.isNotificationChange(true);
    store.NotificationMessageChange('ログインしてください。')
    router.push('/loginPage');
  }
}

const handleClick = () => {
  router.push({ name: 'prodcutPage_Detail', params: { id: props.data._id }, query: props.data });
}
</script>

<template>
  <div class="prodcutPage_coupon_content">
    <div class="prodcutPage_coupon_img">
      <img :src="data.imageUrl" />
    </div>
    <div class="prodcutPage_coupon_container">
      <div class="prodcutPage_coupon_info">
        <div class="prodcutPage_coupon_describe">
          <div class="prodcutPage_coupon_text">
            <a style="font-size: 1.8rem;"> {{ data.describe }} </a>
          </div>
          <div class="prodcutPage_coupon_text">
            <a style="font-size: 1.2rem;"> {{ data.category }} </a>
            <div>
              <a style="font-size: 1.2rem; padding-right: 10px;"> $ {{ data.price }} </a>
              <button class="prodcutPage_coupon_button" @click="addCart(data)">ついか</button>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion_content">
        <div class="accordion_content_info"><a>びこう: {{ data.remark }}</a></div>
        <button class="accordion_content_button" @click="handleClick()">しょうさい</button>
      </div>
      <div class="prodcutPage_coupon_waves waves_one"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>