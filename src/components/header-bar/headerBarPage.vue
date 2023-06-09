<script setup>
import { MENU_LIST } from '../../configs/site'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted, watch, onUpdated } from 'vue'
const router = useRouter()
const localCycle = ref({ left: '-100%' })
const spppp = (e) => {
  localCycle.value = e
}

onUpdated(() => {
  let target = MENU_LIST.filter((e) => { return e.route === router.currentRoute.value.fullPath })
  localCycle.value = target[0].style
})


</script>

<template>
  <ul>
    <div class="nav_branch">
      <li v-for="(item, index) in MENU_LIST">
        <router-link class="nav_items" :to="item.route" :key="index"
          :class="{ nav_items_animation: router.currentRoute.value.fullPath === item.route }">
          <div @click="spppp(item.style)">
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