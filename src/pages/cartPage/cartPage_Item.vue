<script setup>
import { reactive } from 'vue'
import Cookies from 'js-cookie';
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
  let token = Cookies.get('token')
  state.count++;
  let submitData = {
    id: props.data._id,
    token: token,
    count: 1
  }
  let response = await Service.postUploadCart(submitData);

  if (response.status === 'success') {
    props.refresh()
  }
}

const decrement = async () => {
  let token = Cookies.get('token')
  if ((state.count) <= 1) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('少なくとも1つの商品')
  } else {
    state.count--;
    let submitData = {
      id: props.data._id,
      token: token,
      count: -1
    }
    let response = await Service.postUploadCart(submitData);

    if (response.status === 'success') {
      props.refresh()
    }
  }
}

const deleteCart = async () => {
  let submitData = {
    id: props.data._id,
    token: props.data.token,
  }
  let response = await Service.postDeleteCart(submitData);

  if (response.status === 'success') {
    props.refresh()
  }
}

const handleClick = () => {
  router.push({ name: 'prodcutPage_Detail', params: { id: props.data._id }, query: props.data });
}

</script>

<template>
  <div class="cartPage_Item_contaner" @click="handleClick(data)">
    <div class="cartPage_Item_content">
      <div class="cartPage_Item_describe">
        <div class="cartPage_Item_text">
          <a>
            {{ data.describe }}
          </a>
        </div>
        <button @click.stop="deleteCart">
          <img class="cartPage_Item_img" src="../../assets/plus.png" />
        </button>
      </div>
      <div class="cartPage_Item_describe">
        <div class="cartPage_Item_text">
          <a> ¥ </a>
          <a>
            {{ data.price }}
          </a>
        </div>
        <div class="cartPage_Item_store">
          <button @click.stop="increment">
            <img class="cartPage_Item_img" src="../../assets/plus.png" />
          </button>
          <div class="cartPage_Item_Data">
            <a>
              {{ state.count }}
            </a>
          </div>
          <button @click.stop="decrement">
            <img class="cartPage_Item_img" src="../../assets/plus.png">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
