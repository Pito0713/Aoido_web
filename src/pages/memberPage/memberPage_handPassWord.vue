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
const { handleSubmit, form, } = useForm()
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
    store.isNotificationChange(true);
    store.NotificationMessageChange('需先登入')
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
      <goBackPage :title="'密碼變更'" />
      <div class="memberPage_handPassWord_container">
        <Field name="oldPassWord" v-model="userList.oldPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">{{ $t('舊密碼') }} :</a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="oldPassWord" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>

          </label>
        </Field>
        <Field name="newPassWord" v-model="userList.newPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">{{ $t('新密碼') }} :</a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="newPassWord" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <Field name="newPassWordAgain" v-model="userList.newPassWordAgain" rules="required|confirmed:@newPassWord"
          v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">{{ $t('確認新密碼') }} :</a>
            <div class="memberPage_handPassWord_input">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="newPassWordAgain" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <div class="memberPage_handPassWord_button">
          <button type="submit">{{ $t('變更') }}</button>
        </div>
      </div>

    </form>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>