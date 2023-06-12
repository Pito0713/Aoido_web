<script setup>
import { ref } from 'vue'
const isShow = ref(false)
const props = defineProps({
  isView: Boolean
})
</script>

<template>
  <div class="nav_burger">
    <button class="nav_burger_button" @click="$emit('handViewChange', !props.isView)">
      <transition>
        <span class="burger_line" id='lineOne' :class="{ route: isView }"></span>
      </transition>
      <transition>
        <span class="burger_line" id='linethree' :class="{ route2: isView }"></span>
      </transition>
      <transition>
        <span class="burger_line" id='linetwo' :class="{ route3: isView }"></span>
      </transition>
    </button>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>