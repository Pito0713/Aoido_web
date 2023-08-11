<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Service from "@SERVICE/service";
import Cookies from 'js-cookie';
import goBackPage from '@COM/go-back/goBackPage.vue'
const props = defineProps({
  msg: String | Number
})
const userList = reactive({
  oldPassWord: '',
  newPassWord: '',
  newPassWordAgain: '',
  token: '',
})
import { useForm } from 'vee-validate';
const router = useRouter()
const { handleSubmit, form, errors } = useForm()
import { useStore } from '@STORE/main';
const store = useStore();

const postHandPassWord = async () => {
  store.isloadingChange(true)
  let token = Cookies.get('token')
  let submitData = {
    oldPassWord: userList.oldPassWord,
    newPassWord: userList.newPassWord,
    newPassWordAgain: userList.newPassWordAgain,
    token: token,
  };

  const response = await Service.postHandPassWord(submitData);
  if (response?.status === 'success' && response?.data) {
    Cookies.remove('password');
    Cookies.remove('token');
    router.push('/loginPage');
  }
  store.isloadingChange(false)
}

const onSubmit = handleSubmit((e) => {
  postHandPassWord()
});

</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <goBackPage />
      <div class="memberPage_handPassWord_container">
        <Field name="oldPassWord" v-model="userList.oldPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">古いパスワード:</a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" />
              <ErrorMessage class="memberPage_handPassWord_input_text" v-if="errors" :errors="errors"
                name="oldPassWord" />
            </div>

          </label>
        </Field>
        <Field name="newPassWord" v-model="userList.newPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">新しいパスワード: </a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" />
              <ErrorMessage class="memberPage_handPassWord_input_text" v-if="errors" :errors="errors"
                name="newPassWord" />
            </div>
          </label>
        </Field>
        <Field name="newPassWordAgain" v-model="userList.newPassWordAgain" rules="required|confirmed:@newPassWord"
          v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">新しいパスワードをもう一度入力してください:</a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" />
              <ErrorMessage class="memberPage_handPassWord_input_text" v-if="errors" :errors="errors"
                name="newPassWordAgain" />
            </div>
          </label>
        </Field>
        <div class="memberPage_handPassWord_button">
          <a>かいいん</a>
          <button type="submit">{{ `変 更` }}</button>
        </div>
      </div>

    </form>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>