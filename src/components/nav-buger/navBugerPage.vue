<script setup>
import { ref } from 'vue'
const isShow = ref(false)
const props = defineProps({
  isView: Boolean
})
</script>

<template>
  <button class="nav-burger" @click="$emit('handViewChange', !props.isView)">
    <transition>
      <span class="burger-line" id='lineOne' :class="{ route: isView }"></span>
    </transition>
    <transition>
      <span class="burger-line" id='linethree' :class="{ route2: isView }"></span>
    </transition>
    <transition>
      <span class="burger-line" id='linetwo' :class="{ route3: isView }"></span>
    </transition>
  </button>
</template>


<style lang="scss" scoped>
@import "./style";
</style>