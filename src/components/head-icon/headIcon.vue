<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleClick = () => {
  router.push({ name: 'homePage' });
}

</script>

<template>
  <div class="headIcon_head">
    <button @click="handleClick()">
      <img class="headIcon_themeIcon" src="../../assets/theme.svg" />
    </button>
    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>