<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Service from "@SERVICE/service";

import { useStore } from '@STORE/main';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isAlertBoxComfirm, isAlertBoxChancel } = storeToRefs(store);

const props = defineProps({
  data: {},
  refresh: Function
})

const state = reactive({
  count: props.data.count
});

const increment = async () => {
  state.count++;
  let submitData = {
    id: props.data._id,
    token: props.data.token,
    count: state.count
  }
  let response = await Service.postUploadChart(submitData);
}

const decrement = async () => {
  if ((state.count) <= 1) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('last One')
  } else {
    state.count--;
    let submitData = {
      id: props.data._id,
      token: props.data.token,
      count: state.count
    }
    let response = await Service.postUploadChart(submitData);
  }
}

const deleteChart = async () => {
  let submitData = {
    id: props.data._id,
    token: props.data.token,
  }
  let response = await Service.postDeleteChart(submitData);

  if (response.status === 'success') {
    props.refresh()
  }
}

</script>

<template>
  <div class="chartPage_Item_contaner">
    <div class="chartPage_Item_content">
      <div class="chartPage_Item_describe">
        <div class="chartPage_Item_text">
          <a>
            {{ data.describe }}
          </a>
        </div>
        <button @click="deleteChart">
          <img class="chartPage_Item_img" src="../../assets/plus.png" />
        </button>
      </div>

      <div class="chartPage_Item_describe">
        <div class="chartPage_Item_text">
          <a>
            {{ data.price }}
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
