<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";

const mainPhoto = reactive({
  data: {},
});
const getFindActiveMainImg = async () => {
  let response = await Service.getFindActiveMainImg();
  if (response.status === 'success') {
    mainPhoto.data = response.data
  }
}

onMounted(() => {
  getFindActiveMainImg()
})
</script>

<template>
  <div class="homePage_main_prouduct">
    <div class="homePage_main_prouduct_describe">
      <div class="homePage_main_prouduct_describe_container">
        <template v-for="(item, index) in mainPhoto">
          <div class="homePage_main_prouduct_describe_container_item">
            <div>
              <img :src="item[0]?.img" alt="">
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>