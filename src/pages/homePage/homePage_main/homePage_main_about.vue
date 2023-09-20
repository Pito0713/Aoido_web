<script setup>
import { reactive, onMounted } from 'vue'
import Service from "@SERVICE/service";

const mainPhoto = reactive({
  data: {},
});

// animation for view show
const changeView = (e) => {
  for (let i = 0; i < mainPhoto.data.length; i++) {
    mainPhoto.data[i].isView = false
  }
  let target = mainPhoto.data.filter((item) => {
    return item._id == e
  })

  target[0].isView = true
}

const getFindActiveAboutImg = async () => {
  let response = await Service.getFindActiveAboutImg();
  if (response.status === 'success') {
    mainPhoto.data = response.data
    for (let i = 0; i < mainPhoto.data.length; i++) {
      if (i == 0) mainPhoto.data[i].isView = true
      else mainPhoto.data[i].isView = false
    }
  }
}

onMounted(() => {
  getFindActiveAboutImg()
})
</script>

<template>
  <div class="homePage_main_about">
    <div class="homePage_main_about_info">
      <template v-for="(item, index) in mainPhoto.data">
        <div class="homePage_main_about_info_container" :class="{ route: item.isView }" @click="changeView(item._id)">
          <div>
            <img :src=item.img alt="" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>