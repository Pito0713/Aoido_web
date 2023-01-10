<script setup>
import {ref} from 'vue'

import headerbar from '../components/header-bar/headerBarPage.vue';
import footerSide from '../components/footerSide/footerSidePage.vue';
import navBugerPage from '../components/nav-buger/navBugerPage.vue';
import asideMenuPage from '../components/aside-menu/asideMenuPage.vue';

const isView = ref(false)
const handViewChange = () =>{
  isView.value = !isView.value
}
</script>

<template>
  <div>
    <div >
      <headerbar class="head"/>
      <navBugerPage class="buger" @click="handViewChange()"/>
      <div class="view">
        <asideMenuPage v-if="isView"/>
        <router-view/>
      </div>
      <footerSide class="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>