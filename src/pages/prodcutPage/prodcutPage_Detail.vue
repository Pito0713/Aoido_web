<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toggle = () => {
  router.back()
}

const addChart = () => {
  console.log('addChart')
}

const expanded = ref(router?.currentRoute?.value?.query);

</script>

<template>
  <div>
    <div class="prodcutPage_category">
      <!-- <prodcutPage_category /> -->
    </div>
    <button class="prodcutPage_Detail_button" @click="toggle()">
      <img class="prodcutPage_Detail_Arrow" src="../../assets/leftArrow.png" />
    </button>
    <div style="display: flex; justify-content:center; align-items: center; flex-direction: column;">
      <div class="prodcutPage_Detail_img">{{ expanded.imageUrl }}</div>
      <div>
        <a>describe:</a>
        <a>{{ expanded.describe }}</a>
      </div>
      <div>
        <a>price</a>
        <a>{{ expanded.price }}</a>
      </div>
      <div>
        <a>remark</a>
        <a>{{ expanded.remark }}</a>
      </div>
      <button class="prodcutPage_Detail_button" @click="addChart()">
        <a>add chart</a>
      </button>
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>