<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const ListData = reactive({
  name: '',
  abbress: '',
  phone: ''
});

const isCheck = ref(false)

const onLogInCheck = () => {
  isCheck.value = !isCheck.value
  console.log(isCheck.value)
}

</script>

<template>
  <div class="loginPage">
    <div class="loginPage_content">
      <a class="loginPage_text">name</a>
      <input class="loginPage_input" v-model="ListData.name" placeholder='${foo}' />
    </div>
    <div class="loginPage_content">
      <a class="loginPage_text">abbress</a>
      <input class="loginPage_input" v-model="ListData.name" placeholder='${foo}' />
    </div>

    <div class="loginPage_button_group">
      <transition>
        <button class="loginPage_button" :class="{ loginButton: isCheck }" type="button"
          @click="onLogInCheck()">Revise</button>
      </transition>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>