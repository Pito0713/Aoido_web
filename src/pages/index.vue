<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import headerbar from '@COM/header-bar/headerBarPage.vue';
import navBugerPage from '@COM/nav-buger/navBugerPage.vue';

const isView = ref(false)
const handViewChange = () => {
  isView.value = !isView.value
}

const router = useRouter()

</script>

<template>
  <div class="container">
    <!-- <navBugerPage v-if="router.currentRoute.value.path !== ('/loginPage')" :isView="isView"
      @handViewChange="handViewChange()" /> -->
    <div class="content">
      <div class="view">
        <router-view />
      </div>
    </div>
    <headerbar v-if="router.currentRoute.value.path !== ('/loginPage')" class="head" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>