<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const List = reactive([
  { id: 0, item: 'template', isView: true },
  { id: 1, item: 'template', isView: false },
  { id: 2, item: 'template', isView: false },
  { id: 3, item: 'template', isView: false },
]);

const changeView = (e) => {
  for (let i = 0; i < List.length; i++) {
    List[i].isView = false
  }
  List[e].isView = true
}
</script>

<template>
  <div class="homePage_main_about">
    <div class="homePage_main_about_describe">
      <div>
        <img src='../../../assets/archive.png' alt="">
      </div>
      <a> Specifies the largest possible scale a font can reach when allowFontScaling is enabled. Possible values:</a>
    </div>
    <div class="homePage_main_about_info">
      <template v-for="(item, index) in List">
        <div class="homePage_main_about_info_container" :class="{ route: item.isView }" @click="changeView(item.id)">
          <div>
            <img src='../../../assets/archive.png' alt="" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>