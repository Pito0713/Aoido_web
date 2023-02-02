<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'


import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';
const props = defineProps({
  foo: String | Number
})

const isRevise = ref(false)

const ListData = reactive({
  name: '',
  abbress: '',
  phone: '',
  num: 0
});
const onReviseChange = (val) => {
  isRevise.value = !isRevise.value
}

const store = useStore();
const { isAlertBox } = storeToRefs(store);

</script>

<template>
  <div class="memberPage_Item_container">
    <div class="memberPage_Item_title">{{ foo }}</div>
    <template v-if="foo === 'birth'">
      <div class="memberPage_Item_content">
        <select v-model="ListData.num" class="memberPage_Item_select">
          <option value="0" disabled selected>請選擇</option>
          <option :value="ListData.num" v-for="(item) in 10" :key="ListData.num">{{ item }}</option>
        </select><a class="memberPage_Item_text">年</a>
        <select v-model="ListData.num" class="memberPage_Item_select">
          <option value="0" disabled selected>請選擇</option>
          <option :value="ListData.num" v-for="(item) in 10" :key="ListData.num">{{ item }}</option>
        </select><a class="memberPage_Item_text">月</a>
        <select v-model="ListData.num" class="memberPage_Item_select">
          <option value="0" disabled selected>請選擇</option>
          <option :value="ListData.num" v-for="(item) in 10" :key="ListData.num">{{ item }}</option>
        </select><a class="memberPage_Item_text">日</a>
      </div>
    </template>
    <template v-else>
      <input class="memberPage_Item_content" v-model="ListData.name" placeholder='${foo}' />
    </template>
    <button v-if='!isRevise' class="memberPage_Item_button" type="button" @click="onReviseChange()">Revise</button>
    <button v-else='isRevise' class="memberPage_Item_button" type="button"
      @click="onReviseChange(); store.isAlertBoxChange(true)">save</button>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>