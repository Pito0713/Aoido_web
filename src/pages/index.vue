<script setup>
import { useRouter } from 'vue-router'
import headerbar from '@COM/header-bar/headerBarPage.vue';
const router = useRouter()

</script>

<template>
  <div class="container">
    <div class="content">
      <div class="view">
        <router-view />
      </div>
    </div>
    <headerbar v-if="!['/loginPage', '/createMember'].includes(router.currentRoute.value.path)" class="head" />
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>