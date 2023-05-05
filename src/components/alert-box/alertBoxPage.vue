<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isAlertBoxComfirm, isAlertBoxChancel, AlertMessage } = storeToRefs(store);

</script>

<template>
  <div class="alertBoxPage">
    <div class="alertBoxPage_content">
      <div>
        <a>{{ AlertMessage }}</a>
      </div>
      <div class="alertBoxPage_button_group">
        <button v-if="isAlertBoxComfirm" class="alertBoxPage_button" type="button"
          @click="store.isAlertBoxComfirmChange(!isAlertBoxComfirm)">comfirm</button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>