<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isAlertBox, AlertMessage } = storeToRefs(store);

</script>

<template>
  <div class="alertBoxPage">
    <div class="alertBoxPage_content">
      <div>
        <a>{{ AlertMessage }}</a>
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