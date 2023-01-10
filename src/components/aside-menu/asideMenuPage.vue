<script setup>
import { MENU_LIST } from '../../configs/site'
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in MENU_LIST">
        <router-link :to="item.route">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>