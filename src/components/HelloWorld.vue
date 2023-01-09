<script setup>
import { useStore } from '../store/main';
import { storeToRefs } from 'pinia';

defineProps({
  msg: String,
})

const store = useStore();
const { counter } = storeToRefs(store);

</script>
<template>
  <h1>{{ counter }}</h1>

  <div class="card">
    <button type="button" @click="store.increment()">count</button>
    <button type="button" @click="store.randomizeCounter()">randomizeCounter</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
