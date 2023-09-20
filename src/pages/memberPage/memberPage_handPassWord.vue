<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate';
import Cookies from 'js-cookie';
import { useStore } from '@STORE/main';
import goBackPage from '@COM/go-back/goBackPage.vue'
import Service from "@SERVICE/service";

const router = useRouter()
const { handleSubmit, form, } = useForm()
const store = useStore();

const userList = reactive({
  oldPassWord: '',
  newPassWord: '',
  newPassWordAgain: '',
  token: '',
})

const postHandPassWord = async () => {
  let token = Cookies.get('token')
  let submitData = {
    oldPassWord: userList.oldPassWord,
    newPassWord: userList.newPassWord,
    newPassWordAgain: userList.newPassWordAgain,
    token: token,
  };

  store.isloadingChange(true)
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

const onSubmit = handleSubmit(() => {
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
                <a class="memberPage_input_errorText">{{ $t(message) }}</a>
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
                <a class="memberPage_input_errorText">{{ $t(message) }}</a>
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
                <a class="memberPage_input_errorText">{{ $t(message) }}</a>
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