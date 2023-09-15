<script setup>
import { ref, reactive, watch } from 'vue'
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
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    id: props.data._id,
    token: token,
    count: 1
  }
  let response = await Service.postCreateCart(submitData);

  if (response.status === 'success') {
    state.count++;
    props.refresh()
  }
  store.isloadingChange(false)
}

const decrement = async () => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  if ((state.count) <= 1) {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange("商品最少要大於一個。")
  } else {
    let submitData = {
      id: props.data._id,
      token: token,
      count: -1
    }
    let response = await Service.postCreateCart(submitData);

    if (response.status === 'success') {
      state.count--;
      props.refresh()
    }
  }
  store.isloadingChange(false)
}

const deleteCart = async () => {
  store.isloadingChange(true)
  let submitData = {
    id: props.data._id,
    token: props.data.token,
  }
  let response = await Service.postDeleteCart(submitData);

  if (response.status === 'success') {
    props.refresh()
  }
  store.isloadingChange(false)
}

const handleClick = () => {
  router.push({ name: 'prodcutPage_Detail', params: { id: props.data._id }, query: props.data });
}
</script>

<template>
  <div class="cartPage_Item_contaner" @click="handleClick(data)">
    <img class="cartPage_Item_img" :src="props.data.imageUrl" />
    <div class="cartPage_Item_content">
      <div class="cartPage_Item_describe">
        <div class="cartPage_Item_text">
          <a style="font-size: 1.5rem;">
            {{ data.describe }}
          </a>
        </div>
        <div class="cartPage_Item_text">
          <a> {{ $t('小計') }} $ {{ data.price * state.count }}</a>
        </div>
      </div>
      <div class="cartPage_Item_describe">
        <div class="cartPage_Item_text">
          <a> $ </a>
          <a>
            {{ data.price }}
          </a>
        </div>
        <div class="cartPage_Item_store">
          <button class="cartPage_Item_icon" @click.stop="increment">
            <img src="../../assets/plus.svg" />
          </button>
          <div class="cartPage_Item_Data">
            <a>
              {{ state.count }}
            </a>
          </div>
          <button class="cartPage_Item_icon" @click.stop="decrement">
            <img src="../../assets/minus.svg">
          </button>
        </div>
      </div>
    </div>
    <button @click.stop="deleteCart">
      <img style="border: none;" class="cartPage_Item_icon" src="../../assets/trash.svg" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>