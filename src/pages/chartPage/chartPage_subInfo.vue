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
    <div class="chartPage_subInfo_container">
      <label class="chartPage_subInfo_label">名前 :</label>
      <input class="chartPage_subInfo_input" v-model="orderListData.uesrName" placeholder="uesrName"
        :disabled="isChecked" />
    </div>
    <div class="chartPage_subInfo_container">
      <label class="chartPage_subInfo_label">県/町村:</label>
      <div class="chartPage_subInfo_select">
        <select style="height: 2rem;" v-model="selectedCityOption" :disabled="isChecked">
          <option v-for="(option, index) in CityTownData.City" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
        <a> / </a>
        <select style="height: 2rem;" v-model="selectedTownOption" :disabled="isChecked">
          <option v-for="(option, index) in CityTownData.Town" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="chartPage_subInfo_container">
      <label class="chartPage_subInfo_label">住所 :</label>
      <input class="chartPage_subInfo_input" v-model="orderListData.addres" placeholder="addres" :disabled="isChecked" />
    </div>
    <div class="chartPage_subInfo_container">
      <label class="chartPage_subInfo_label">電話 :</label>
      <input class="chartPage_subInfo_input" v-model="orderListData.phone" placeholder="phone" :disabled="isChecked" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
