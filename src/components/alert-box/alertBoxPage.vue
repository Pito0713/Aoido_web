<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

defineProps({
  msg: String | Number,
  isView: Boolean
})
const store = useStore();
const { isAlertBox } = storeToRefs(store);
</script>

<template>
  <div class="alertBoxPage">
    <div class="alertBoxPage_content">
      <div>
        <a>{{ msg }}</a>
      </div>
      <div class="alertBoxPage_button_group">
        <button class="alertBoxPage_button" type="button" @click="store.isAlertBoxChange(!isAlertBox)">comfirm</button>
        <button class="alertBoxPage_button" type="button" @click="store.isAlertBoxChange(!isAlertBox)">chancel</button>
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>