<script setup>
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@STORE/main';
import DatePicker from 'vue3-datepicker';
import goBackPage from '@COM/go-back/goBackPage.vue'
import Service from "@SERVICE/service";

const store = useStore();
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
  city: "",
  town: "",
})

const CountyData = reactive({
  data: {}
});

const CityTownData = reactive({
  City: '',
  Town: '',
});
const selectedCityOption = ref('臺北市')
const selectedTownOption = ref('中正區')

import { useForm } from 'vee-validate';
const router = useRouter()
const { handleSubmit, form, errors } = useForm()
const onSubmit = handleSubmit(async (e) => {
  let submitData = {
    account: userList.account,
    password: userList.password,
    uesrName: userList.uesrName,
    birth: userList.birth,
    mail: userList.mail,
    phone: userList.phone,
    addres: userList.addres,
    city: userList.city,
    town: userList.town,
  }
  const response = await Service.postRegister(submitData);
  if (response?.status === 'success' && response?.data) {
    router.push('/loginPage');
    store.isNotificationChange(true);
    store.NotificationMessageChange('登録が成功しました')
  }
});
const getCountyItems = async () => {
  const response = await Service.getCountyItems();
  if (response?.status === 'success' && response?.data) {
    CountyData.data = response.data
    const City = Object.keys(response.data);
    CityTownData.City = City.filter((item) => { return item !== "_id" })
    CityTownData.Town = CountyData.data[selectedCityOption.value]
  }
}

watch(selectedCityOption, () => {
  CityTownData.Town = CountyData.data[selectedCityOption.value]
});

onMounted(() => {
  getCountyItems()
});

</script>

<template>
  <div>
    <goBackPage />
    <form @submit.prevent="onSubmit">

      <div class="createMember">

        <Field name="account" v-model="userList.account" rules="account" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">アカウント(必須):</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="account" />
            </div>
          </label>
        </Field>

        <Field name="password" v-model="userList.password" rules="password" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">パスワード(必須):</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="password" />
            </div>
          </label>
        </Field>

        <Field name="birth" label="birth" v-model="userList.birth">
          <label class="createMember_container">
            <a class="createMember_text">誕生日:</a>
            <div class="createMember_container_inputgroup">
              <DatePicker v-model="userList.birth" style="width: 175px; height: 2rem;"></DatePicker>
            </div>
          </label>
          <ErrorMessage v-if="errors" :errors="errors" name="birth" />
        </Field>

        <Field name="mail" v-model="userList.mail" rules="email" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">ポスト(必須):</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="mail" />
            </div>
          </label>
        </Field>

        <Field name="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">電話(必須):</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
              <ErrorMessage class="createMember_errorMessage" v-if="errors" :errors="errors" name="phone" />
            </div>
          </label>
        </Field>

        <Field name="uesrName" v-model="userList.uesrName" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">ニックネーム:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
            </div>
          </label>
        </Field>

        <Field name="City" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">県/町村:</a>
            <div class="createMember_container_inputgroup" style="flex-direction: row;">
              <select class="createMember_select" v-model="selectedCityOption">
                <option v-for="(option, index) in CityTownData.City" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
              <a style="font-size: 1.5rem; margin: 0px 10px;"> / </a>
              <select class="createMember_select" v-model="selectedTownOption">
                <option v-for="(option, index) in CityTownData.Town" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </label>
        </Field>

        <Field name="addres" v-model="userList.addres" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">住所:</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" />
            </div>
          </label>
        </Field>

        <button class="createMember_button" type="button" @click="onSubmit()">登録</button>
      </div>

    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>