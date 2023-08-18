<script setup>
import { inject } from 'vue'

const selectedTownOption = inject('selectedTownOption');
const orderListData = inject('orderListData');
const selectedCityOption = inject('selectedCityOption');
const CityTownData = inject('CityTownData');
const isChecked = inject('isChecked');

</script>

<template>
  <div>
    <div class="cartPage_subInfo_container">
      <label class="cartPage_subInfo_label">
        <a>{{ $t("名字") }} :</a>
      </label>
      <input class="cartPage_subInfo_input" v-model="orderListData.uesrName" :disabled="isChecked" />
    </div>
    <div class="cartPage_subInfo_container">
      <label class="cartPage_subInfo_label"><a>{{ $t("縣市/鄉鎮") }} :</a></label>
      <div class="cartPage_subInfo_select">
        <select style="height: 2rem; margin: 0px 7.5px;" v-model="selectedCityOption" :disabled="isChecked">
          <option v-for="(option, index) in CityTownData.City" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
        <a> / </a>
        <select style="height: 2rem; margin: 0px 7.5px;" v-model="selectedTownOption" :disabled="isChecked">
          <option v-for="(option, index) in CityTownData.Town" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="cartPage_subInfo_container">
      <label class="cartPage_subInfo_label"><a>{{ $t("地址") }} :</a></label>
      <input class="cartPage_subInfo_input" v-model="orderListData.addres" :disabled="isChecked" />
    </div>
    <div class="cartPage_subInfo_container">
      <label class="cartPage_subInfo_label"><a>{{ $t("電話") }} :</a></label>
      <input class="cartPage_subInfo_input" v-model="orderListData.phone" :disabled="isChecked" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
