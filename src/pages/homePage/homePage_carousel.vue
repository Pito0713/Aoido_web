<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Service from "@SERVICE/service";

const isView = ref(true)
const List = reactive({
  data: {},
});
const ListData = reactive({
  ListCount: 1,
  ListItem: []
});

const getFindActiveCarouselImg = async () => {
  let response = await Service.getFindActiveCarouselImg();
  if (response.status === 'success') {
    List.data = response.data
    ListData.ListItem.push(response.data[0])
    ListData.ListItem.push(response.data[1])
  }
}

// timer
let intervalId
onMounted(() => {
  getFindActiveCarouselImg()
  intervalId = setInterval(() => {
    handChange()
  }, 5000)
})

// clear timer
onUnmounted(() => clearInterval(intervalId))

const handChange = () => {
  isView.value = !isView.value

  if (ListData.ListCount % 2 == 0) {
    let target1 = List.data.length > ListData.ListCount ?
      ListData.ListCount :
      ((ListData.ListCount - List.data.length) == List.data.length ? 0 : ListData.ListCount - List.data.length)
    let target2 = List.data.length > ListData.ListCount + 1 ?
      ListData.ListCount + 1 :
      ((ListData.ListCount - List.data.length) == List.data.length ? 1 : ListData.ListCount - List.data.length + 1)
    let target = [
      List.data[target1],
      List.data[target2],
    ]
    ListData.ListItem = target
  }
  if (ListData.ListCount == List.data.length * 2) ListData.ListCount = 0
  ListData.ListCount = ListData.ListCount + 1
}
</script>

<template>
  <div class="homePage_carousel_container">
    <transition name="slide">
      <div class="homePage_carousel_itemContainer" v-if="isView">
        <div class="homePage_carousel_img">
          <img :src="ListData.ListItem[0]?.img" alt="">
        </div>
      </div>
      <div class="homePage_carousel_itemContainer" v-else>
        <div class="homePage_carousel_img">
          <img :src="ListData.ListItem[1]?.img" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>