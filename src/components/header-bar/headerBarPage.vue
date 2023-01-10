<script setup>
import { MENU_LIST } from '../../configs/site'
</script>

<template>
  <div>
    <ul class="nav-branch">
      <li class="nav-items" v-for="(item, index) in MENU_LIST">
        <router-link :to="item.route">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>