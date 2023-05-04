<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  msg: String | Number
})

const expanded = ref(false);
const toggle = () => {
  expanded.value = !expanded.value
}

</script>

<template>
  <div class="memberPage_coupon_content">
    <div class="memberPage_coupon_content" @click="toggle()">
      <template v-if="expanded">
        <a class="memberPage_coupon_text"> > </a>
      </template>
      <template v-if="!expanded">
        <a class="memberPage_coupon_text"> = </a>
      </template>
      <a class="memberPage_coupon_text"> {{ msg }} </a>
    </div>
    <button @click="toggle()">picker</button>
  </div>
  <transition v-if="expanded" name="slide">
    <div class="accordion-content">
      {{ msg }}
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "./style";
</style>