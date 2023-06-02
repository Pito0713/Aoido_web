<script setup>
import { MENU_LIST } from '../../configs/site'
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
  <div>
    <ul class="nav_branch">
      <li v-for="(item, index) in MENU_LIST">
        <router-link class="nav_items" :to="item.route" :key="index"
          :class="{ nav_items_animation: router.currentRoute.value.fullPath === item.route }">
          <img class="nav_items_img" :src=item.img alt=""
            :class="{ nav_items_img_animation: router.currentRoute.value.fullPath === item.route }" />
          <a class="nav_items_text"
            :class="{ nav_items_text_animation: router.currentRoute.value.fullPath === item.route }">
            {{ item.text }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>