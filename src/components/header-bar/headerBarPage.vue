<script setup>
import { MENU_LIST } from '../../configs/site'
</script>

<template>
  <div>
    <ul class="nav_branch">
      <li v-for="(item, index) in MENU_LIST">
        <router-link class="nav_items" :to="item.route" :key="index">
          <img class="nav_items_img" :src=item.img alt="" />
          <a class="nav_items_text"> {{ item.text }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>