<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
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
const onSubmit = handleSubmit((e) => {
});
const toggle = () => {
  router.back()
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <goBackPage />
      <div class="memberPage_handPassWord_container">
        <Field name="oldPassWord" v-model="userList.oldPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">新しいパスワード:</a>
            <input class="memberPage_handPassWord_input" type="text" v-bind="field" />
            <ErrorMessage v-if="errors" :errors="errors" name="oldPassWord" />
          </label>
        </Field>
        <Field name="newPassWord" v-model="userList.newPassWord" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">古いパスワード:</a>
            <input class="memberPage_handPassWord_input" type="text" v-bind="field" />
            <ErrorMessage v-if="errors" :errors="errors" name="newPassWord" />
          </label>
        </Field>
        <Field name="newPassWordAgain" v-model="userList.newPassWordAgain" rules="required" v-slot="{ field }">
          <label class="memberPage_handPassWord_content">
            <a class="memberPage_handPassWord_label">新しいパスワードをもう一度入力してください:</a>
            <input class="memberPage_handPassWord_input" type="text" v-bind="field" />
            <ErrorMessage v-if="errors" :errors="errors" name="newPassWordAgain" />
          </label>
        </Field>
      </div>
    </form>

  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>