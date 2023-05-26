<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import DatePicker from 'vue3-datepicker';
import goBackPage from '@COM/go-back/goBackPage.vue'
const props = defineProps({
  msg: String | Number
})
const userList = reactive({
  account: '',
  password: '',
  createdAt: '',
  birth: new Date(),
  mail: '',
  phone: '',
  uesrName: '',
  addres: '',
  photo: '',
  city: "",
  town: "",
})
import { useForm } from 'vee-validate';
const router = useRouter()
const { handleSubmit, form, errors } = useForm()
const onSubmit = handleSubmit((e) => {
  console.log(e)
});

</script>

<template>
  <div>
    <goBackPage />
    <form @submit.prevent="onSubmit">

      <div class="createMember">

        <Field name="account" v-model="userList.account" rules="account" v-slot="{ field }">
          <label class="createMember_container">
            <a>account:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="account" />
            </div>
          </label>
        </Field>

        <Field name="password" v-model="userList.password" rules="password" v-slot="{ field }">
          <label class="createMember_container">
            <a>password:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="password" />
            </div>
          </label>
        </Field>

        <Field name="birth" label="birth" v-model="userList.birth">
          <label class="createMember_container">
            <a>birth:</a>
            <DatePicker v-model="userList.birth" style="width: 175px; height: 2rem;"></DatePicker>
          </label>
          <ErrorMessage v-if="errors" :errors="errors" name="birth" />
        </Field>

        <Field name="mail" v-model="userList.mail" rules="email" v-slot="{ field }">
          <label class="createMember_container">
            <a>mail:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="mail" />
            </div>
          </label>
        </Field>

        <Field name="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
          <label class="createMember_container">
            <a>phone:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="phone" />
            </div>
          </label>
        </Field>

        <Field name="uesrName" v-model="userList.uesrName" v-slot="{ field }">
          <label class="createMember_container">
            <a>uesrName:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
            </div>
          </label>

        </Field>

        <Field name="addres" v-model="userList.addres" v-slot="{ field }">
          <label class="createMember_container">
            <a>addres:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
            </div>
          </label>
        </Field>

        <div>
          <button type="button" @click="onSubmit()">Revise</button>
        </div>
      </div>

    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>