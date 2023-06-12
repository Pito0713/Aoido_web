<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isloading } = storeToRefs(store);

</script>

<template>
  <div class="loadingPage">
    <div class="loadingPage_content">
      <a>loading</a>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>