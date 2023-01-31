<script setup>
const props = defineProps({
  page: String | Number
})

</script>

<template>
  <div class="pagination_container">
    <button @click="$emit('onPageChange', props.page - 1 > 0 ? props.page - 1 : 1)">
      <img class="pagination_Arrow" src="../../assets/leftArrow.png" />
    </button>
    <div>
      <a>{{ props.page }}</a>
    </div>
    <button @click="$emit('onPageChange', props.page + 1)">
      <img class="pagination_Arrow" src="../../assets/rightArrow.png" />
    </button>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>