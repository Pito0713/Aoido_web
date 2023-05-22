<script setup>
import { ref, onMounted, reactive, watch, provide } from 'vue'
import Cookies from 'js-cookie';
import Service from "@SERVICE/service";
import chartPage_Item from './chartPage_Item.vue'
import chartPage_subInfo from './chartPage_subInfo.vue'

import { useStore } from '@STORE/main';
const store = useStore();

const selectedCityOption = ref('臺北市')
const selectedTownOption = ref('中正區')
const page = ref(1)
const selectedPriec = ref('');
const isChecked = ref(false)

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

const postChartData = async () => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    token: token,
    page: page.value,
    pagination: 9999
  }
  let response = await Service.postChartData(submitData);
  if (response) cartList.data = response.data
  store.isloadingChange(false)
};


const handleCheckOut = async () => {
  let CheckOutList = cartList.data.map(item => { return { id: item._id, count: item.count } })

  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    token: token,
    CheckOutList: CheckOutList,
    infoData: {
      uesrName: orderListData.uesrName,
      addres: orderListData.addres,
      city: selectedCityOption.value,
      town: selectedTownOption.value,
      phone: orderListData.phone
    }
  }
  ////  訂單系統

  store.isloadingChange(false)
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

watch(selectedCityOption, (newVal, oldVal) => {
  CityTownData.Town = CountyData.data[selectedCityOption.value]
});

watch(cartList, (newVal, oldVal) => {
  let target = cartList.data.reduce(function (accumulator, currentValue, currentIndex, array) {
    return accumulator + Number(currentValue.count) * Number(currentValue.price); //前值與當下值相加
  }, 0) //傳入起始值為 0
  selectedPriec.value = target || 0
});

watch(isChecked, (newVal, oldVal) => {
  if (newVal) postUserinfo()
});

onMounted(() => {
  postChartData()
  getCountyItems()
});

provide('orderListData', orderListData);
provide('selectedCityOption', selectedCityOption);
provide('selectedTownOption', selectedTownOption);
provide('CityTownData', CityTownData);
provide('isChecked', isChecked);

</script>

<template>
  <div class="chartPage">
    <div class="container">
      <div class="chartPage_subInfo">
        <div class="chartPage_subInfo_title">
          <a>注文情報</a>
        </div>
        <div class="chartPage_subInfo_checkbox">
          <input type="checkbox" id="checkbox" v-model="isChecked">
          <label for="checkbox">同じ会員情報</label>
        </div>
        <chartPage_subInfo />
      </div>

      <div class="chartPage_Item">
        <div class="chartPage_Item_title">
          <a>ショッピングカート</a>
        </div>

        <ul class="chartPage_Item_ul">
          <li class="chartPage_Item_li" v-for=" (item, index) in cartList.data" :key="item._id">
            <chartPage_Item :data=item :refresh="() => postChartData()" />
          </li>
        </ul>
      </div>
    </div>
    <div class="chartPage_total">
      <div>
        <a class="chartPage_total_titel">選択した商品</a>
        <a class="chartPage_total_titel">{{ cartList.data.length }}</a>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        <a class="chartPage_total_titel">ごうけい</a>
        <a> ¥ </a>
        <a class="chartPage_total_titel">{{ selectedPriec }}</a>
        <button class="chartPage_total_button" @click="handleCheckOut()"> お会計</button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>