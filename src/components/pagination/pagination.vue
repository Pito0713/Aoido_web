<script setup>
const props = defineProps({
  page: String | Number
})

</script>

<template>
  <div class="pagination_container">
    <button @click="$emit('onPageChange', props.page - 1 > 0 ? props.page - 1 : 1)" :disabled='props.page == 1'>
      <img class="pagination_Arrow" src="../../assets/arrowLeft.svg" />
    </button>
    <div style="margin: 0 10px;">
      <a style="font-size: 20px;">{{ props.page }}</a>
    </div>
    <button @click="$emit('onPageChange', props.page + 1)">
      <img class="pagination_Arrow" src="../../assets/arrowRight.svg" />
    </button>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>