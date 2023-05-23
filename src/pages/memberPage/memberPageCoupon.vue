<script setup>
import { ref, onMounted, reactive } from 'vue'
import moment from 'moment';
import Service from "@SERVICE/service";
import Cookies from 'js-cookie';
import { useStore } from '@STORE/main';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore();

const currentTime = moment();

const id = ref(Cookies.get('id'))

const couponList = reactive({
  data: {},
});

const postFindAllCoupon = async () => {
  let token = Cookies.get('token')
  let submitData = {
    token: token,
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
      store.AlertMessageChange('受け取りました')
      postFindAllCoupon()
    }
    store.isloadingChange(false)
  } else {
    router.push('/homePage');
  }
}

const isFilterId = (value) => {
  let target = value.filter((item) => { return item === id.value })

  if (target.length > 0) return true
  else return false
}

onMounted(() => {
  postFindAllCoupon()
});

</script>

<template>
  <div class="memberPageCoupon_container">
    <template v-for="(item, index) in couponList.data">
      <div class="memberPageCoupon_Item">
        <div class=" memberPageCoupon_Item_description">
          <a>{{ item.describe }}</a>
          <a>{{ moment(item.createdAt).format('L') }} - {{ moment(item.endDate).format('L') }}</a>
        </div>
        <div class="memberPageCoupon_Item_button">
          <template v-if="isFilterId(item.user)">
            <button :disabled="true">
              {{ currentTime.isBetween(item.createdAt, item.endDate) ? '已受け取る' : '期限切れです' }}
            </button>
          </template>
          <template v-else>
            <button @click="patchUpdateCouponUser(item)">受け取る</button>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>