<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toggle = () => {
  router.back()
}
const props = defineProps({
  title: String | Number
})
</script>

<template>
  <div class="goBackPageContainer">
    <div class="goBackPageImgContent" @click="toggle()">
      <img class="goBackArrow" src="../../assets/arrowLeft.svg" />
    </div>
    <div class="goBackPageTextContent">
      <a>{{ $t(props?.title ? props.title : '') }}</a>
    </div>
    <div class=" goBackPageImgContent"></div>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>