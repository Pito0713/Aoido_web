

<script setup>
import welcome from './page/templates/welcome/index.vue'
import { useStore } from './store/main';
import { storeToRefs } from 'pinia';
const store = useStore();
const { APILoading } = storeToRefs(store);
</script>

<template>
  <welcome />
</template>

