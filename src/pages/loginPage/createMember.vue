<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@STORE/main';
import DatePicker from 'vue3-datepicker';
import goBackPage from '@COM/go-back/goBackPage.vue'
import Service from "@SERVICE/service";

const store = useStore();
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
const { handleSubmit, form } = useForm()
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
    store.NotificationMessageChange('註冊成功')
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
    <form @submit.prevent="onSubmit">
      <goBackPage :title='"創建帳號"' />
      <div class="createMember">
        <Field name="account" v-model="userList.account" rules="account" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('帳號') }}({{ $t('必填') }}) :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="account" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <Field name="password" v-model="userList.password" rules="password" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('密碼') }}({{ $t('必填') }}) :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="password" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <Field name="birth" label="birth" v-model="userList.birth">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('生日') }} :</a>
            <div class="createMember_container_inputgroup">
              <DatePicker v-model="userList.birth" style="width: 195px; height: 2rem;"></DatePicker>
            </div>
          </label>
        </Field>
        <Field name="mail" v-model="userList.mail" rules="mail" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('郵箱') }} :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="mail" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <Field name="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('電話') }}({{ $t('必填') }}) :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
              <ErrorMessage name="phone" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
        <Field name="uesrName" v-model="userList.uesrName" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('暱稱') }} :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
            </div>
          </label>
        </Field>
        <Field name="City" v-slot="{ field }">
          <label class="createMember_container">
            <a class="createMember_text">{{ $t('縣市/鄉鎮') }} :</a>
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
            <a class="createMember_text">{{ $t('地址') }} :</a>
            <div class="createMember_container_inputgroup">
              <input type="text" v-bind="field" autocomplete="off" />
            </div>
          </label>
        </Field>
        <button class="createMember_button" type="button" @click="onSubmit()">{{ $t('創建') }}</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>