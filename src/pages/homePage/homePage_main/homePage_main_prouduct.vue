<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";
const List = [
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
]

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
        <template v-for="(item, index) in List">
          <div class="homePage_main_prouduct_describe_container_item">
            <div>123</div>
            <a>{{ item.item }}</a>
          </div>
        </template>
      </div>
    </div>
    <div class="homePage_main_prouduct_item">
      <div>
        <img src='../../../assets/archive.png' alt="">
        <a> Specifies the largest possible scale a font can reach when allowFontScaling is enabled. Possible values:</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>