<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const List = [
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
  { item: 'template' },
]
</script>

<template>
  <div>
    <div class="homePage_main_prouduct_describe">
      <div class="homePage_main_prouduct_describe_category">
        <template v-for="(item, index) in List">
          <div>
            <a>{{ item.item }}</a>
          </div>
        </template>
      </div>
      <div class="homePage_main_prouduct_describe_container">
        <template v-for="(item, index) in List">
          <div class="homePage_main_prouduct_describe_container_item">
            <div>123</div>
            <a>{{ item.item }}</a>
          </div>
        </template>
      </div>
    </div>
    <div class="homePage_main_prouduct_item">
      <div>
        <a href="">123</a>
      </div>
      <a> Specifies the largest possible scale a font can reach when allowFontScaling is enabled. Possible values:</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>