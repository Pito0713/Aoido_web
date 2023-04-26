<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import pagination from '../../components/pagination/pagination.vue';
const props = defineProps({
  foo: String | Number
})

const state = reactive({
  count: Number(0)
});

function increment() {
  state.count++;
}

function decrement() {
  state.count--;
}

</script>

<template>
  <div class="chartPage_Item_contaner">
    <div class="chartPage_Item_content">
      <div class="chartPage_Item_text">
        <a>
          {{ foo }}
        </a>
      </div>
      <div class="chartPage_Item_describe">
        <div class="chartPage_Item_info">
          <a>
            {{ foo }}{{ foo }}
          </a>
        </div>
        <div class="chartPage_Item_store">
          <button @click="increment">
            <img class="chartPage_Item_img" src="../../assets/plus.png" />
          </button>
          <div class="chartPage_Item_Data">
            <a>
              {{ state.count }}
            </a>
          </div>
          <button @click="decrement">
            <img class="chartPage_Item_img" src="../../assets/plus.png">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
