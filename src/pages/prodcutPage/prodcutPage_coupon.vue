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
    store.NotificationMessageChange('需先登入')
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
    <div class="prodcutPage_coupon_title">
      <a class="prodcutPage_coupon_title_text">
        {{ data.price }}
      </a>
    </div>
    <div class="prodcutPage_coupon_container">
      <div class="prodcutPage_coupon_info">
        <div class="prodcutPage_coupon_describe">
          <div>
            <a class="prodcutPage_coupon_describe_text" style="font-size: 1.8rem;"> {{ data.describe }} </a>
          </div>
          <div class="prodcutPage_coupon_text">
            <a style="font-size: 1.5rem;"> {{ data.category }} </a>
            <div>
              <button class="prodcutPage_coupon_button" @click="addCart(data)">
                <a>
                  {{ $t('購買') }}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion_content">
        <div class="accordion_content_info">
          <a class="accordion_content_info_text">びこう: {{ data.remark }}</a>
          <button class="accordion_content_button" @click="handleClick()">
            <a>
              {{ $t('商品詳細') }}
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>