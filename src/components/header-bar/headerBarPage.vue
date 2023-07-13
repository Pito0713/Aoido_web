<script setup>
import { MENU_LIST } from '../../configs/site'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted, watch, onUpdated } from 'vue'
const router = useRouter()
const localCycle = ref({ left: '-100%' })
const localCycleChange = (e) => {
  localCycle.value = e
}

onUpdated(() => {
  let target = MENU_LIST.filter((e) => { return e.name === router.currentRoute.value.fullPath.split("/")[1] })

  if (target.length > 0) {
    localCycle.value = target[0].style
  }
  console.log(localCycle.value)
})


</script>

<template>
  <ul>
    <div class="nav_branch">
      <li v-for="(item, index) in  MENU_LIST ">
        <router-link class="nav_items" :to="item.route" :key="index"
          :class="{ nav_items_animation: router.currentRoute.value.fullPath.split('/')[1] === item.name }">
          <div @click="localCycleChange(item.style)">
            <img v-if="router.currentRoute.value.fullPath !== item.route" class="nav_items_img" :src=item.img alt="" />
            <img v-else class="nav_items_img" :src=item.activeImg alt="" />
          </div>

        </router-link>
      </li>
      <div class="showCycle" :style="localCycle"></div>
    </div>
  </ul>
</template>


<style lang="scss" scoped>
@import "./style";
</style>