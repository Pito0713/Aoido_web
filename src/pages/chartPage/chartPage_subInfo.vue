<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const ListData = reactive({
  name: '',
  abbress: '',
  phone: ''
});

</script>

<template>
  <div>
    <div class="chartPage_subInfo_contaner">
      <a class="chartPage_subInfo_title">name</a>
      <input class="chartPage_subInfo_content" v-model="ListData.name" placeholder="name" />
    </div>
    <div class="chartPage_subInfo_contaner">
      <a class="chartPage_subInfo_title">abbress</a>
      <input class="chartPage_subInfo_content" v-model="ListData.abbress" placeholder="abbress" />
    </div>
    <div class="chartPage_subInfo_contaner">
      <a class="chartPage_subInfo_title">phone</a>
      <input class="chartPage_subInfo_content" v-model="ListData.phone" placeholder="phone" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
