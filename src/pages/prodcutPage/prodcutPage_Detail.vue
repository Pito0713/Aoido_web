<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import prodcutPage_category from './prodcutPage_category.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const toggle = () => {
  router.back()
}

const expanded = ref(router?.currentRoute?.value?.query);

</script>

<template>
  <div>
    <div class="prodcutPage_category">
      <prodcutPage_category />
    </div>
    <button class="prodcutPage_Detail_button" @click="toggle()">
      <img class="prodcutPage_Detail_Arrow" src="../../assets/leftArrow.png" />
    </button>
    <div style="display: flex; justify-content:center; align-items: center;">
      <div class="prodcutPage_Detail_img">{{ expanded.msg }}</div>
    </div>
    <div>{{ expanded.msg }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>