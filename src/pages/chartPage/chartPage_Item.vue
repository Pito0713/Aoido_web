<script setup>
import { reactive } from 'vue'
import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter()

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
    count: 1
  }
  let response = await Service.postUploadChart(submitData);

  if (response.status === 'success') {
    props.refresh()
  }
}

const decrement = async () => {
  if ((state.count) <= 1) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('少なくとも1つの商品')
  } else {
    state.count--;
    let submitData = {
      id: props.data._id,
      token: props.data.token,
      count: -1
    }
    let response = await Service.postUploadChart(submitData);

    if (response.status === 'success') {
      props.refresh()
    }
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

const handleClick = () => {
  router.push({ name: 'prodcutPage_Detail', params: { id: props.data._id }, query: props.data });
}

</script>

<template>
  <div class="chartPage_Item_contaner" @click="handleClick(data)">
    <div class="chartPage_Item_content">
      <div class="chartPage_Item_describe">
        <div class="chartPage_Item_text">
          <a>
            {{ data.describe }}
          </a>
        </div>
        <button @click.stop="deleteChart">
          <img class="chartPage_Item_img" src="../../assets/plus.png" />
        </button>
      </div>

      <div class="chartPage_Item_describe">
        <div class="chartPage_Item_text">
          <a> ¥ </a>
          <a>
            {{ data.price }}
          </a>
        </div>
        <div class="chartPage_Item_store">
          <button @click.stop="increment">
            <img class="chartPage_Item_img" src="../../assets/plus.png" />
          </button>
          <div class="chartPage_Item_Data">
            <a>
              {{ state.count }}
            </a>
          </div>
          <button @click.stop="decrement">
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
