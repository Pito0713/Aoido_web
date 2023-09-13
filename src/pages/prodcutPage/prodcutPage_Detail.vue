<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import goBackPage from '@COM/go-back/goBackPage.vue'
import Service from "@SERVICE/service";
import Cookies from 'js-cookie';
import { useStore } from '@STORE/main';

const store = useStore();
const router = useRouter()

const expanded = ref(router?.currentRoute?.value?.query);
const count = ref(1)

const increment = () => {
  count.value++
}

const decrement = () => {
  if (count.value > 1) count.value--
}

const addCart = async () => {
  let token = Cookies.get('token')
  if (!['', null, undefined].includes(token)) {

    store.isloadingChange(true)
    let submitData = {
      id: expanded.value._id,
      token: token,
      count: count.value
    }

    let response = await Service.postCreateCart(submitData);
    store.isloadingChange(false)

    if (response?.status === 'success' && response?.data) {
      return true
    }


  } else {
    store.isNotificationChange(true);
    store.NotificationMessageChange('需先登入')
    router.push('/loginPage');
  }
  return false
}

const addCartAndCheck = async () => {
  let isCheck = await addCart()
  if (isCheck) {
    router.push({ name: 'cartPage' });
  }
}
</script>

<template>
  <div>
    <goBackPage />
    <div class="line">
    </div>
    <div class="prodcutPage_Detail">
      <div class="prodcutPage_Detail_Container">

        <div class="prodcutPage_Detail_imgContent">
          <div class="prodcutPage_Detail_Text">
            <a style="font-size: 1.25rem;">{{ $t('商品分類') }} / </a>
            <a style="font-size: 1.25rem;">{{ expanded.category }}</a>
          </div>
          <div class="prodcutPage_Detail_img">{{ expanded.imageUrl }}</div>
        </div>
        <div class="prodcutPage_Detail_Content">
          <div class="prodcutPage_Detail_titleText" style="">
            <a style="font-size: 2rem; margin: 20px 0px;">{{ expanded.describe }}</a>
          </div>
          <div class="prodcutPage_Detail_remarkText" style="flex-direction: column;">
            <a style="font-size: 1.5rem;">{{ $t('商品詳細') }}</a>
            <a>{{ expanded.remark }}</a>
          </div>
          <div class="prodcutPage_Detail_priceText">
            <a style="font-size: 1.75rem;">{{ $t('價格') }}</a>
            <a style="font-size: 1.5rem;">NT $ {{ expanded.price }}</a>
            <div class=" prodcutPage_Detail_buttonGroup">
              <button @click="increment">
                <img class="prodcutPage_Detail_buttonImg" src="../../assets/plus.svg" />
              </button>
              <div class="prodcutPage_Detail_count">
                <a>
                  {{ count }}
                </a>
              </div>
              <button @click="decrement">
                <img class="prodcutPage_Detail_buttonImg" src="../../assets/minus.svg">
              </button>
            </div>
          </div>
          <div class="prodcutPage_Detail_Text" style="margin-top:  20px;">
            <button class="prodcutPage_Detail_button" style="margin-right:  20px;" @click="addCart()">
              <a>{{ $t('加入購物車') }}</a>
            </button>
            <button class="prodcutPage_Detail_button" @click="addCartAndCheck()">
              <a>{{ $t('立即購買') }}</a>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>