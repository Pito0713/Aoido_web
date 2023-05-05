<script setup>
import { ref, reactive } from 'vue'
import { useStore } from '@STORE/main';

const store = useStore();
const ListData = reactive({
  name: '',
  abbress: '',
  phone: ''
});
const isView = ref(true)

const handChange = () => {
  isView.value = !isView.value
}


</script>

<template>
  <div>
    <div class="chartPage_subInfo_container">
      <a class="chartPage_subInfo_title">name :</a>
      <input class="chartPage_subInfo_input" :disabled="isView" v-model="ListData.name" placeholder="name" />
    </div>
    <div class="chartPage_subInfo_container">
      <a class="chartPage_subInfo_title">abbress :</a>
      <input class="chartPage_subInfo_input" :disabled="isView" v-model="ListData.abbress" placeholder="abbress" />
    </div>
    <div class="chartPage_subInfo_container">
      <a class="chartPage_subInfo_title">phone :</a>
      <input class="chartPage_subInfo_input" :disabled="isView" v-model="ListData.phone" placeholder="phone" />
    </div>
    <template v-if="!isView">
      <button class="chartPage_subInfo_button" type="button"
        @click="handChange(); store.isAlertBoxComfirmChange(true); store.AlertMessageChange(`confrim Change`)">save</button>
    </template>
    <template v-else>
      <button class="chartPage_subInfo_button" @click=" handChange()">revise</button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
