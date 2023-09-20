<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DatePicker from 'vue3-datepicker';
import { useForm } from 'vee-validate';
import { useStore } from '@STORE/main';
import goBackPage from '@COM/go-back/goBackPage.vue'
import Service from "@SERVICE/service";

const store = useStore();
const router = useRouter()
const { handleSubmit, form } = useForm()

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
const countyData = reactive({
  data: {}
});

const cityTownData = reactive({
  city: '',
  town: '',
});
const selectedCityOption = ref('臺北市')
const selectedTownOption = ref('中正區')

/// data for submit
const onSubmit = handleSubmit(async () => {
  let submitData = {
    account: userList.account,
    password: userList.password,
    uesrName: userList.uesrName,
    birth: userList.birth,
    mail: userList.mail,
    phone: userList.phone,
    addres: userList.addres,
    city: selectedCityOption.value,
    town: selectedTownOption.value,
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
    countyData.data = response.data
    const city = Object.keys(response.data);
    cityTownData.city = city.filter((item) => { return item !== "_id" })
    cityTownData.town = countyData.data[selectedCityOption.value]
  }
}

// watch for changes
watch(selectedCityOption, (newValue, oldValue) => {
  cityTownData.town = CountyData.data[selectedCityOption.value]
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) selectedTownOption.value = ''
});

onMounted(() => {
  getCountyItems()
});

</script>

<template>
  <form @submit.prevent="onSubmit">
    <goBackPage :title='"註冊帳號"' />
    <div class="createMember">
      <Field name="account" label="account" v-model="userList.account" rules="account" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('帳號') }}({{ $t('必填') }})</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="account" v-slot="{ message }">
              <a class="createMember_errorMessage">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="password" label="password" v-model="userList.password" rules="password" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('密碼') }}({{ $t('必填') }})</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="password" v-slot="{ message }">
              <a class="createMember_errorMessage">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="birth" label="birth">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('生日') }}</a>
          <div class="createMember_container_inputgroup">
            <DatePicker v-model="userList.birth"
              style="width: 235px; height: 3rem; border: 1px var(--border-color) solid; padding-left: 10px;">
            </DatePicker>
          </div>
        </label>
      </Field>

      <Field name="mail" label="mail" v-model="userList.mail" rules="mail" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('郵箱') }}</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="mail" v-slot="{ message }">
              <a class="createMember_errorMessage">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="phone" label="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('電話') }}({{ $t('必填') }})</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="phone" v-slot="{ message }">
              <a class="createMember_errorMessage">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="uesrName" label="uesrName" v-model="userList.uesrName" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('暱稱') }}</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
          </div>
        </label>
      </Field>
      <Field name="city" label="city">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('縣市') }}</a>
          <div class="createMember_container_inputgroup">
            <select class="createMember_select" v-model="selectedCityOption">
              <option v-for="(option, index) in cityTownData.city" :key="index" :value="option">
                {{ option }}
              </option>
            </select>

          </div>
        </label>
      </Field>
      <Field name="town" label="town">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('鄉鎮') }}</a>
          <div class="createMember_container_inputgroup">
            <select class="createMember_select" v-model="selectedTownOption">
              <option v-for="(option, index) in cityTownData.town" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </label>
      </Field>
      <Field name="addres" label="addres" v-model="userList.addres" v-slot="{ field }">
        <label class="createMember_container">
          <a class="createMember_text">{{ $t('地址') }}</a>
          <div class="createMember_container_inputgroup">
            <input type="text" v-bind="field" autocomplete="off" />
          </div>
        </label>
      </Field>
      <button class="createMember_button" type="button" @click="onSubmit()">
        <a>
          {{ $t('註冊') }}
        </a>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "./style";
</style>