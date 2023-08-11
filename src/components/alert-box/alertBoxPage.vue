<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isAlertBoxComfirm, isAlertBoxChancel, AlertMessage } = storeToRefs(store);

</script>

<template>
  <div class="alertBoxPage">
    <div class="alertBoxPage_content">
      <div style="height: 80%;">
        <a style="font-size: 13px;">{{ AlertMessage }}</a>
      </div>
      <div class="alertBoxPage_button_group" style="height: 20%;">
        <button v-if="isAlertBoxComfirm" class="alertBoxPage_button" type="button"
          @click="store.isAlertBoxComfirmChange(!isAlertBoxComfirm)">OK</button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>