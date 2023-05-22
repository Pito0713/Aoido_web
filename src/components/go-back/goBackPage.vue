<script setup>
import { useStore } from '../../store/main';
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter()
const toggle = () => {
  router.back()
}

</script>

<template>
  <div class="goBackPage">
    <button @click="toggle()">
      <img class="goBackArrow" src="../../assets/leftArrow.png" />
    </button>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>