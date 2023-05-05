<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import headerbar from '@COM/header-bar/headerBarPage.vue';
import footerSide from '@COM/footerSide/footerSidePage.vue';
import navBugerPage from '@COM/nav-buger/navBugerPage.vue';
import asideMenuPage from '@COM/aside-menu/asideMenuPage.vue';

const isView = ref(false)
const handViewChange = () => {
  isView.value = !isView.value
}

const router = useRouter()

</script>

<template>
  <div class="container">
    <div class="content">
      <headerbar v-if="router.currentRoute.value.path !== ('/loginPage')" class="head" />
      <navBugerPage v-if="router.currentRoute.value.path !== ('/loginPage')" :isView="isView"
        @handViewChange="handViewChange()" />
      <transition :class="{ asideMenuPageTransform: isView }">
        <asideMenuPage class="asideMenuPage" :isView="isView" @handViewChange="handViewChange" />
      </transition>
      <div class="view">
        <router-view />
      </div>
    </div>
    <footerSide v-if="router.currentRoute.value.path !== ('/loginPage')" class="footer" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>