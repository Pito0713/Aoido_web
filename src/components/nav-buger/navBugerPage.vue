<script setup>
import {ref} from 'vue'
const isShow = ref(false)
const handViewChange = () =>{
  isShow.value = !isShow.value
}
</script>

<template>
  <button class="nav-burger" @click="handViewChange">
    <transition>
      <span class="burger-line" id='lineOne' :class="{ route: isShow }"></span>
    </transition>
    <transition>
      <span class="burger-line" id='linethree' :class="{ route2: isShow }"></span>
    </transition>
    <transition>
      <span class="burger-line" id='linetwo' :class="{ route3: isShow }"></span>
    </transition>
  </button>
</template>


<style lang="scss" scoped>
@import "./style";
</style>