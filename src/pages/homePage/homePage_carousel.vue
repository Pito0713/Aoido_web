<script setup>
import {ref, reactive, onMounted, onUnmounted} from 'vue'
const List = [
  {item: 123},
  {item: 456},
  {item: 789},
  {item: 101112},
  {item: 131415},
]

const isView = ref(true)
const ListData = reactive({
  ListCount: 1,
  ListItem:[List[0],List[1]]
});


let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    handChange()
  }, 2000)
})

onUnmounted(() => clearInterval(intervalId))

const handChange = () =>{
  isView.value = !isView.value

  if(ListData.ListCount%2 ==0 ){
    let target1 = List.length > ListData.ListCount ? 
      ListData.ListCount : 
      (ListData.ListCount - List.length == List.length ? 0 : ListData.ListCount - List.length)
    let target2 = List.length > ListData.ListCount + 1 ? 
      ListData.ListCount + 1 : 
      (ListData.ListCount - List.length == List.length ? 1 : ListData.ListCount - List.length+1)
    let target = [
      List[target1],
      List[target2],
    ]
    ListData.ListItem = target
  }
  if (ListData.ListCount == List.length*2) ListData.ListCount = 0
  ListData.ListCount = ListData.ListCount +1
}
</script>

<template>
  <div class="homePage_carousel_container">
    <transition name="slide">
      <div class="homePage_carousel_itemContainer" v-if="isView">{{ListData.ListItem[0].item}}</div>
      <div class="homePage_carousel_itemContainer" v-else>{{ListData.ListItem[1].item}}</div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>