<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'


import { useStore } from '@STORE/main';
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

</script>

<template>
  <form @submit.prevent="submitForm" class="memberPage_Item_container">
    <label v-if="foo === 'name'" class="memberPage_Item_content">
      <a class="memberPage_Item_title">Name:</a>
      <input class="memberPage_Item_input" v-model="ListData.name" type="text" placeholder='foo' required
        :disabled="!isRevise" />
    </label>
    <label v-if="foo === 'birth'" class="memberPage_Item_content">
      <a class="memberPage_Item_title">birth:</a>
      <input class="memberPage_Item_input" v-model="ListData.birth" type="text" placeholder='foo' required
        :disabled="!isRevise" />
    </label>
    <label v-if="foo === 'phone'" class="memberPage_Item_content">
      <a class="memberPage_Item_title">phone:</a>
      <input class="memberPage_Item_input" v-model="ListData.phone" type="text" placeholder='foo' required
        :disabled="!isRevise" />
    </label>
    <label v-if="foo === 'address'" class="memberPage_Item_content">
      <a class="memberPage_Item_title">address:</a>
      <input class="memberPage_Item_input" v-model="ListData.address" type="text" placeholder='foo' required
        :disabled="!isRevise" />
    </label>
    <label v-if="foo === 'mail'" class="memberPage_Item_content">
      <a class="memberPage_Item_title">mail:</a>
      <input class="memberPage_Item_input" v-model="ListData.password" type="text" placeholder='foo' required
        :disabled="!isRevise" />
    </label>
    <button v-if='!isRevise' class="memberPage_Item_button" type="button" @click="onReviseChange()">Revise</button>
    <button v-else='isRevise' class="memberPage_Item_button" type="button"
      @click="onReviseChange(); store.isAlertBoxComfirmChange(true); store.AlertMessageChange(`${foo} 測試`)">save</button>
  </form>
</template>

<style lang="scss" scoped>
@import "./style";
</style>