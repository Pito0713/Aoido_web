<script setup>
import { ref } from 'vue'

import headerbar from '../components/header-bar/headerBarPage.vue';
import footerSide from '../components/footerSide/footerSidePage.vue';
import navBugerPage from '../components/nav-buger/navBugerPage.vue';
import asideMenuPage from '../components/aside-menu/asideMenuPage.vue';

const isView = ref(false)
const handViewChange = () => {
  isView.value = !isView.value
}
</script>

<template>
  <div class="container">
    <headerbar class="head" />
    <navBugerPage class="buger" @click="handViewChange()" />
    <transition :class="{ asideMenuPageTransform: isView }">
      <asideMenuPage class="asideMenuPage" />
    </transition>
    <router-view />
    <footerSide class="footer" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>