<script setup>
import { ref, onMounted, reactive, watch, provide, nextTick } from 'vue'
import Cookies from 'js-cookie';
import moment from 'moment';
import cartPage_Item from './cartPage_Item.vue'
import cartPage_subInfo from './cartPage_subInfo.vue'
import titleDot from '@COM/title-dot/title-dot.vue';
import { useStore } from '@STORE/main';
import Service from "@SERVICE/service";
import headIcon from '@COM/head-icon/headIcon.vue';

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = useStore();
const { isAlertBoxComfirm } = storeToRefs(store);

const selectedCityOption = ref('臺北市')
const selectedTownOption = ref('中正區')
const page = ref(1)
const selectedPriec = ref('');
const originalselectedPriec = ref('');
const selectedOption = ref('');
const isChecked = ref(false)
const isCheckedOut = ref(false)
const isView = ref(false)
const id = ref(Cookies.get('id'))

const cartList = reactive({
  data: {},
});

const orderListData = reactive({
  uesrName: '',
  city: '',
  town: '',
  addres: '',
  phone: ''
});

const CountyData = reactive({
  data: {}
});

const CityTownData = reactive({
  City: '',
  Town: '',
});

const couponList = reactive({
  data: {},
});


const postCartData = async () => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    token: token,
    page: page.value,
    pagination: 9999
  }
  let response = await Service.postCartData(submitData);
  if (response) cartList.data = response.data
  store.isloadingChange(false)
};

const handleCheckOut = async () => {
  let CheckOutList = cartList.data.map(item => { return { id: item._id, count: item.count } })
  let token = Cookies.get('token')
  if (
    ['', null, undefined].includes(orderListData.uesrName) ||
    ['', null, undefined].includes(orderListData.addres) ||
    ['', null, undefined].includes(orderListData.phone)) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('資料未齊全')
  } else if (CheckOutList.length == 0) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('購物車沒東西')
  } else {
    store.isloadingChange(true)

    let submitData = {
      id: id.value,
      token: token,
      CheckOutList: CheckOutList,
      selectedOption: selectedOption.value.id ? selectedOption.value.id : '',
      infoData: {
        uesrName: orderListData.uesrName,
        addres: orderListData.addres,
        city: selectedCityOption.value,
        town: selectedTownOption.value,
        phone: orderListData.phone
      }
    }
    const response = await Service.postCreateOrder(submitData);
    if (response?.status === 'success') {
      store.isAlertBoxComfirmChange(true);
      store.AlertMessageChange('訂單成立')
      isCheckedOut.value = true;
    }
    store.isloadingChange(false)
  }
}


const getCountyItems = async () => {
  const response = await Service.getCountyItems();
  if (response?.status === 'success' && response?.data) {
    CountyData.data = response.data
    const City = Object.keys(response.data);
    CityTownData.City = City.filter((item) => { return item !== "_id" })
    CityTownData.Town = CountyData.data[selectedCityOption.value]
  }
}

const postUserinfo = async () => {
  if (isChecked.value) {
    let token = Cookies.get('token')
    let submitData = {
      token: token,
    };

    store.isloadingChange(true)
    const response = await Service.postUserinfo(submitData);
    if (response?.status === 'success' && response?.data) {
      orderListData.uesrName = response?.data[0].uesrName
      orderListData.addres = response?.data[0].addres
      orderListData.phone = response?.data[0].phone
      selectedCityOption.value = response?.data[0].city
      selectedTownOption.value = response?.data[0].town
    }
    store.isloadingChange(false)
  }
}

const postFindPersonalCoupon = async () => {
  let submitData = {
    id: id.value,
  };
  store.isloadingChange(true)
  const response = await Service.postFindPersonalCoupon(submitData);
  if (response?.status === 'success' && response?.data) {
    couponList.data = response.data
  }
  store.isloadingChange(false)
}

const isNegative = (number) => {
  return number < 0;
}

const toggle = () => {
  router.go(0);
}


watch(selectedCityOption, (newVal, oldVal) => {
  CityTownData.Town = CountyData.data[selectedCityOption.value]
});

watch(cartList, (newVal, oldVal) => {
  let target = cartList.data.reduce(function (accumulator, currentValue, currentIndex, array) {
    return accumulator + Number(currentValue.count) * Number(currentValue.price); //前值與當下值相加
  }, 0) //傳入起始值為 0
  selectedPriec.value = target || 0
  originalselectedPriec.value = target || 0
});

watch(isChecked, (newVal, oldVal) => {
  if (newVal) postUserinfo()
  isView.value = isChecked.value
});

watch(selectedOption, (newVal, oldVal) => {
  selectedPriec.value = !isNegative(Number(originalselectedPriec.value) - Number(newVal.discount)) ? Number(originalselectedPriec.value) - Number(newVal.discount) : 0
});

watch(isAlertBoxComfirm, (newVal, oldVal) => {
  if (!newVal && isCheckedOut.value) toggle()
});

onMounted(() => {
  postCartData()
  getCountyItems()
  postFindPersonalCoupon()
});

provide('orderListData', orderListData);
provide('selectedCityOption', selectedCityOption);
provide('selectedTownOption', selectedTownOption);
provide('CityTownData', CityTownData);
provide('isChecked', isChecked);

</script>

<template>
  <div class="cartPage">
    <headIcon />
    <titleDot msg="購物車" />
    <div class="cartPage_container">
      <div class="cartPage_Item">
        <ul class="cartPage_Item_ul">
          <template v-if="cartList.data.length > 0">
            <div>
              <li class="cartPage_Item_li" v-for=" (item, index) in cartList.data" :key="item._id">
                <cartPage_Item :data=item :refresh="() => postCartData()" />
              </li>
            </div>
          </template>
          <template v-else>
            <div>
              <li class="cartPage_Item_li">
                <a style="font-size: 1.25rem;"> {{ $t('購物車內沒有商品') }} </a>
              </li>
            </div>
          </template>

        </ul>
      </div>
    </div>
    <titleDot msg="會員資料" />
    <div class="cartPage_container">
      <div class="cartPage_subInfo">

        <div class="cartPage_subInfo_checkbox">
          <input type="checkbox" id="checkbox" v-model="isChecked">
          <label for="checkbox">
            <a>
              {{ $t('同會員資料') }}
            </a>
          </label>
        </div>
        <cartPage_subInfo />

      </div>
    </div>
    <titleDot msg="優惠卷" />
    <div class="cartPageCoupon">

      <div class="cartPageCoupon_container">
        <template v-if='Object.keys(couponList.data).length > 0'>
          <template v-for="(item, index) in couponList.data" :key="item.id">
            <div class="cartPage_coupon_item">
              <input type="radio" :value="item" v-model="selectedOption" />
              <div>
                <a>{{ item.describe }}</a>
                <a style="margin-left: 5px;">$ {{ item.discount }}</a>
                <a style="color: gray; font-size: 0.8rem; margin-left: 5px;">{{ moment(item.startDate).format('L') }} - {{
                  moment(item.endDate).format('L')
                }}</a>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <div style="margin: 10px;">
            <a>
              {{ $t('沒有可用的優惠卷') }}
            </a>
          </div>
        </template>
      </div>
    </div>
    <titleDot msg="小計" />
    <div class="cartPage_total">
      <div>
        <div class="cartPage_total_group">
          <a class="cartPage_total_titel">{{ $t('選的商品') }}</a>
          <a class="cartPage_total_titel">{{ cartList.data.length }}</a>
        </div>
        <div class="cartPage_total_group">
          <a v-if="selectedOption.describe" class="cartPage_total_titel">{{ $t('使用優惠卷') }}</a>
          <a class="cartPage_total_titel">{{ selectedOption.describe ? selectedOption.describe : $t('未使用優惠卷') }}</a>
        </div>
      </div>
      <div class="cartPage_total_groud">

        <div>
          <a class="cartPage_total_titel">{{ $t('合計金額') }}</a>
          <a> $ </a>
          <a class="cartPage_total_titel">{{ selectedPriec }}</a>
        </div>

      </div>

    </div>
    <div class="cartPage_CheckOut_button">
      <button @click="handleCheckOut()"><a>{{ $t('結帳') }}</a></button>
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>