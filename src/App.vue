<script setup>
import App from './pages/index.vue'
import alertBoxPage from './components/alert-box/alertBoxPage.vue';
import notificationPage from './components/notification/notificationPage.vue';
import loadingPage from './components/loading/loadingPage.vue';
import { useStore } from './store/main';
import { storeToRefs } from 'pinia';
import loginPage from './pages/loginPage/loginPage.vue';
import footerSide from './components/footerSide/footerSidePage.vue';
const store = useStore();
const { isAlertBoxComfirm, isAlertBoxChancel, isloading, isNotification } = storeToRefs(store);
</script>

<template>
  <div class="app">
    <template v-if="isloading">
      <loadingPage />
    </template>
    <template v-if="isAlertBoxComfirm">
      <alertBoxPage></alertBoxPage>
    </template>
    <template v-if="isNotification">
      <notificationPage />
    </template>
    <App />
  </div>
</template>

