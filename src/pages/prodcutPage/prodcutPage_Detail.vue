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

    let response = await Service.postUploadCart(submitData);

    if (response?.status === 'success' && response?.data) {
    }
    store.isloadingChange(false)
  } else {
    store.isNotificationChange(true);
    store.NotificationMessageChange('ログインしてください。')
    router.push('/loginPage');
  }
}



</script>

<template>
  <div>
    <goBackPage />

    <div class="prodcutPage_Detail">
      <div class="prodcutPage_Detail_Container">
        <div class="prodcutPage_Detail_Content">
          <div class="prodcutPage_Detail_img">{{ expanded.imageUrl }}</div>
        </div>
        <div class="prodcutPage_Detail_Content">
          <div class="prodcutPage_Detail_Text">
            <a style="font-size: 1rem;">ぶんるい</a>
            <a style="font-size: 2rem;">{{ expanded.category }}</a>
          </div>
          <div class="prodcutPage_Detail_Text">
            <a style="font-size: 1rem;">ぶんるい</a>
            <a style="font-size: 2rem;">{{ expanded.describe }}</a>
          </div>
        </div>
      </div>
      <div class="prodcutPage_Detail_Container">
        <div class="prodcutPage_Detail_Content">
          <div class="prodcutPage_Detail_Text" style="flex-direction: column;">
            <a style="font-size: 2rem;">しょうさい </a>
            <a style="font-size: 1rem;">{{
              `「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす。「明日がら」なるす`
            }}</a>
          </div>
        </div>
        <div class="prodcutPage_Detail_Content">
          <div class="prodcutPage_Detail_Text">
            <a style="font-size: 1rem;">価格</a>
            <a style="font-size: 1.2rem;">¥ {{ expanded.price }}</a>
          </div>
          <div class=" prodcutPage_Detail_buttonGroup">
            <button @click="increment">
              <img class="prodcutPage_Detail_buttonImg" src="../../assets/plus.png" />
            </button>
            <div class="prodcutPage_Detail_count">
              <a>
                {{ count }}
              </a>
            </div>
            <button @click="decrement">
              <img class="prodcutPage_Detail_buttonImg" src="../../assets/plus.png">
            </button>
            <button class="prodcutPage_Detail_button" @click="addCart()">
              <a>add cart</a>
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