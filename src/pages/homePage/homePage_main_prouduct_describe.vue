<script setup>
import {ref, reactive, onMounted, onUnmounted} from 'vue'
const List = [
  {item: 'template'},
  {item: 'template'},
  {item: 'template'},
  {item: 'template'},
]
</script>

<template>
  <div class="homePage_main_prouduct_describe">
    <div class="homePage_main_prouduct_describe_category">
      <template  v-for="(item, index) in List" >
        <div>
          <a>{{item.item}}</a>
        </div>
      </template>
    </div>
    <div class="homePage_main_prouduct_describe_container">
      <template  v-for="(item, index) in List" >
        <div class="homePage_main_prouduct_describe_container_item">
          <div>123</div>
          <a>{{item.item}}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>