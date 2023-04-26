<script setup>
import App from './pages/index.vue'
import alertBoxPage from './components/alert-box/alertBoxPage.vue';
import { useStore } from './store/main';
import { storeToRefs } from 'pinia';
import loginPage from './pages/loginPage/loginPage.vue';
const store = useStore();
const { isAlertBox, isCheckLogin } = storeToRefs(store);
console.log(isCheckLogin)
</script>

<template>
  <div class="app">
    <template v-if="isAlertBox">
      <alertBoxPage></alertBoxPage>
    </template>
    <template v-if="!isCheckLogin">
      <loginPage />
    </template>
    <template v-else>
      <App />
    </template>
  </div>
</template>

