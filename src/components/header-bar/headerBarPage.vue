<script setup>
import {ref} from 'vue'
import { MENU_LIST } from '../../configs/site'
const LIST = ref(MENU_LIST.length)

const listPart1 = () => {
  let target = []
  for(let i = 0; i < LIST.value/2; i++) {
    target.push(MENU_LIST[i])
  }
  return target
}

const listPart2 = () => {
  let target = []
  for(let i =  LIST.value/2; i < LIST.value; i++) {
    target.push(MENU_LIST[i])
  }
  return target
}
</script>

<template>
  <div>
    <ul class="nav-branch">
      <li class="nav-items" v-for="(item, index) in listPart1()">
        <router-link :to="item.route" :key="index">{{ item.name }}</router-link>
      </li>
    </ul>
    <a>44564</a>
    <ul class="nav-branch">
      <li class="nav-items" v-for="(item, index) in listPart2()">
        <router-link :to="item.route" :key="index">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./style";
</style>