<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";


const mainPhoto = reactive({
  data: {},
});

const List = reactive({
  data: {},
});

const changeView = (e) => {
  for (let i = 0; i < List.data.length; i++) {
    List.data[i].isView = false
  }
  let target = List.data.filter((item) => {
    return item._id == e
  })

  target[0].isView = true
}

const getFindActiveAboutImg = async () => {
  let response = await Service.getFindActiveAboutImg();
  if (response.status === 'success') {
    List.data = response.data
    for (let i = 0; i < List.data.length; i++) {
      if (i == 0) List.data[i].isView = true
      else List.data[i].isView = false
    }
  }
}



onMounted(() => {
  getFindActiveAboutImg()
})

</script>

<template>
  <div class="homePage_main_about">
    <div class="homePage_main_about_describe">
      <div>
        <img src='../../../assets/archive.png' alt="">
      </div>
      <a> Specifies the largest possible scale a font can reach when allowFontScaling is enabled. Possible values:</a>
    </div>
    <div class="homePage_main_about_info">
      <template v-for="(item, index) in List.data">
        <div class="homePage_main_about_info_container" :class="{ route: item.isView }" @click="changeView(item.id)">
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