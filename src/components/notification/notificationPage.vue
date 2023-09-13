<script setup>
import { useStore } from '../../store/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isNotification, NotificationMessage } = storeToRefs(store);

</script>

<template>
  <transition>
    <div class="notificationPage" :class="{ route: isNotification }">
      <a>{{ $t(NotificationMessage) }}</a>
    </div>
  </transition>
</template>


<style lang="scss" scoped>
@import "./style";
</style>