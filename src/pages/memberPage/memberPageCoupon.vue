<script setup>
import { ref, onMounted, reactive } from 'vue'
import moment from 'moment';
import Cookies from 'js-cookie';

import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';

const store = useStore();
const currentTime = moment();

const id = ref(Cookies.get('id'))

const couponList = reactive({
  data: {},
});

// coupon function
const postFindAllCoupon = async () => {
  let submitData = {
    id: id.value,
  };

  store.isloadingChange(true)
  const response = await Service.postFindAllCoupon(submitData);
  if (response?.status === 'success' && response?.data) {
    couponList.data = response.data
  }
  store.isloadingChange(false)
}

const patchUpdateCouponUser = async (_value) => {
  let UserId = Cookies.get('id')

  if (UserId) {
    let submitData = {
      id: _value.id,
      user: UserId,
    }
    store.isloadingChange(true)

    const response = await Service.patchUpdateCouponUser(submitData);
    if (response?.status === 'success') {
      store.isAlertBoxComfirmChange(true);
      store.AlertMessageChange('已領取')
      postFindAllCoupon()
    }
    store.isloadingChange(false)
  } else {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('領取失敗')
  }
}

onMounted(() => {
  postFindAllCoupon()
});

</script>

<template>
  <div class="memberPageCoupon_container">
    <template v-for="(item, index) in couponList.data">
      <div class="memberPageCoupon_Item">
        <template v-if="item.user[0]">
          <img class="memberPageCoupon_container_img" src='../../assets/pin.svg'>
        </template>
        <div class=" memberPageCoupon_Item_description">
          <a>{{ item.describe }}</a>
        </div>
        <div class="memberPageCoupon_Item_button">
          <a>{{ moment(item.startDate).format('YYYY / MM /DD') }} - {{ moment(item.endDate).format('YYYY / MM /DD') }}</a>
          <template v-if="item.usered[0]">
            <button :disabled="true">
              {{ $t('已使用') }}
            </button>
          </template>
          <template v-else>
            <template v-if="item.user[0]">
              <button :disabled="true">
                {{ $t('已領取') }}
              </button>
            </template>
            <template v-else>
              <template v-if="currentTime.isBetween(item.startDate, item.endDate)">
                <button @click="patchUpdateCouponUser(item)">
                  {{ $t('可領取') }}
                </button>
              </template>
              <template v-else>
                <button :disabled="true">
                  {{ $t('過期') }}
                </button>
              </template>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>