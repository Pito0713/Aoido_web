<script setup>
import App from './pages/index.vue'
import alertBoxPage from './components/alert-box/alertBoxPage.vue';
import notificationPage from './components/notification/notificationPage.vue';
import loadingPage from './components/loading/loadingPage.vue';
import { useStore } from './store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isAlertBoxComfirm, isloading, isNotification } = storeToRefs(store);
</script>

<template>
  <div>
    <template v-if="isloading">
      <loadingPage />
    </template>
    <template v-if="isAlertBoxComfirm">
      <alertBoxPage></alertBoxPage>
    </template>
    <notificationPage />
    <App />
  </div>
</template>

