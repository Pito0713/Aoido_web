<script setup>
import { MENU_LIST } from '../../configs/site'
</script>

<template>
    <ul>
      <li v-for="(item, index) in MENU_LIST" class="item">
        <router-link :to="item.route" :key="index" >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
</template>


<style lang="scss" scoped>
@import "./style";
</style>