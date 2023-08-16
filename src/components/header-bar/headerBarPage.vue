<script setup>
import { MENU_LIST } from '../../configs/site'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUpdated } from 'vue'
const router = useRouter()
const localCycle = ref({ left: '-100%' })
const localCycleChange = (e) => {
  localCycle.value = e
}
onMounted(() => {
  let target = MENU_LIST.filter((e) => { return e.name === router.currentRoute.value.fullPath.split("/")[1] })

  if (target.length > 0) {
    localCycle.value = target[0].style
  } else {
    router.push({ name: 'homePage' });
  }
})

onUpdated(() => {
  let target = MENU_LIST.filter((e) => { return e.name === router.currentRoute.value.fullPath.split("/")[1] })

  if (target.length > 0) {
    localCycle.value = target[0].style
  } else {
    router.push({ name: 'homePage' });
  }
})
</script>

<template>
  <ul>
    <div class="nav_branch">
      <router-link class="nav_items" to="/homePage"
        :class="{ nav_items_animation: router.currentRoute.value.fullPath.split('/')[1] === 'homePage' }">
        <div @click="localCycleChange({ left: '15px' })">
          <img class="nav_items_img" src='../../assets/home_active.svg' alt="" />
        </div>
      </router-link>
      <router-link class="nav_items" to="/prodcutPage"
        :class="{ nav_items_animation: router.currentRoute.value.fullPath.split('/')[1] === 'prodcutPage' }">
        <div @click="localCycleChange({ left: '105px' })">
          <img class="nav_items_img" src='../../assets/package_active.svg' alt="" />
        </div>
      </router-link>
      <router-link class="nav_items" to="/memberPage"
        :class="{ nav_items_animation: router.currentRoute.value.fullPath.split('/')[1] === 'memberPage' }">
        <div @click="localCycleChange({ left: '195px' })">
          <img class="nav_items_img" src='../../assets/user_active.svg' alt="" />
        </div>
      </router-link>
      <router-link class="nav_items" to="/cartPage"
        :class="{ nav_items_animation: router.currentRoute.value.fullPath.split('/')[1] === 'cartPage' }">
        <div @click="localCycleChange({ left: '285px' })">
          <img class="nav_items_img" src='../../assets/package_active.svg' alt="" />
        </div>
      </router-link>
      <div class="showCycle" :style="localCycle"></div>
    </div>
  </ul>
</template>


<style lang="scss" scoped>
@import "./style";
</style>