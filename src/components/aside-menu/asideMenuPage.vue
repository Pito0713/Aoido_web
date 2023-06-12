<script setup>
import { MENU_LIST } from '../../configs/site'
const props = defineProps({
  isView: Boolean
})
</script>

<template>
  <ul class="asideMenuPage">
    <li v-for="(item, index) in MENU_LIST" class="asideMenuPage_item" @click="$emit('handViewChange', !props.isView)">
      <router-link :to="item.route" :key="index">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>


<style lang="scss" scoped>
@import "./style";
</style>