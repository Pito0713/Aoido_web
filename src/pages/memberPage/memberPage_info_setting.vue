<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import moment from 'moment';
import Cookies from 'js-cookie';
import DatePicker from 'vue3-datepicker';
import { useForm } from 'vee-validate';

import goBackPage from '@COM/go-back/goBackPage.vue'
import { useStore } from '@STORE/main';
import Service from "@SERVICE/service";

const { handleSubmit, form, } = useForm()

const store = useStore();
const selectedCityOption = ref('')
const selectedTownOption = ref('')
const CountyData = reactive({
  data: {}
});

const cityTownData = reactive({
  city: '',
  town: '',
});

const userList = reactive({
  uesrName: '',
  birth: new Date(),
  phone: '',
  addres: '',
  mail: '',
  city: '',
  town: '',
  photo: '',
})

// member info
const postUploadUser = async () => {
  let token = Cookies.get('token')

  let submitData = {
    uesrName: userList.uesrName,
    birth: userList.birth,
    phone: userList.phone,
    city: selectedCityOption.value,
    town: selectedTownOption.value,
    addres: userList.addres,
    mail: userList.mail,
    photo: userList.photo,
    token: token,
  };

  if (selectedCityOption.value && selectedTownOption.value) {
    store.isloadingChange(true)
    const response = await Service.postUploadUser(submitData);
    if (response?.status === 'success' && response?.data) {
      postUserinfo()
    }
    store.isloadingChange(false)
  } else {
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('資料未齊全')
  }

}

const postUserinfo = async () => {
  let token = Cookies.get('token')
  let submitData = {
    token: token,
  };

  const response = await Service.postUserinfo(submitData);
  store.isloadingChange(true)
  if (response?.status === 'success' && response?.data) {
    userList.uesrName = response?.data[0].uesrName
    userList.phone = response?.data[0].phone
    userList.birth = new Date(response?.data[0].birth)
    userList.addres = response?.data[0].addres
    userList.mail = response?.data[0].mail
    userList.photo = response?.data[0].photo
    selectedCityOption.value = response?.data[0].city
    selectedTownOption.value = response?.data[0].town
  }
  store.isloadingChange(false)
}

const onSubmit = handleSubmit((e) => {
  postUploadUser()
});

const getCountyItems = async () => {
  const response = await Service.getCountyItems();
  if (response?.status === 'success' && response?.data) {
    CountyData.data = response.data
    const city = Object.keys(response.data);
    cityTownData.city = city.filter((item) => { return item !== "_id" })
    cityTownData.town = CountyData.data[selectedCityOption.value]
  }
}

// watch for changes
watch(selectedCityOption, (newValue, oldValue) => {
  cityTownData.town = CountyData.data[selectedCityOption.value]
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) selectedTownOption.value = ''
});

onMounted(() => {
  postUserinfo()
  getCountyItems()
});

</script>

<template>
  <form @submit.prevent="onSubmit">
    <goBackPage :title="'個人資料變更'" />
    <div class="memberPage_setting_container">
      <Field name="uesrName" v-model="userList.uesrName" rules="required" v-slot="{ field }">
        <label class="memberPage_setting_label">
          <a style="margin-bottom: 20px;">{{ $t('名字') }}</a>
          <div class="memberPage_setting_input">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="uesrName" v-slot="{ message }">
              <a class="memberPage_input_errorText">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="birth" label="birth">
        <label class="memberPage_setting_label">
          <a>{{ $t('生日') }}</a>
          <div class="memberPage_setting_input">
            <DatePicker class="DatePicker"
              style="width: 245px; border: 1px solid var(--border-color); height: 3rem; padding-left: 10px;"
              v-model="userList.birth" :value="moment(userList.birth).format('YYYY / MM / DD')">
            </DatePicker>
          </div>
        </label>
      </Field>
      <Field name="city" label="city">
        <label class="memberPage_setting_label">
          <a>{{ $t('縣市') }}</a>
          <div class="memberPage_setting_input">
            <select v-model="selectedCityOption">
              <option v-for="( option, index ) in  cityTownData.city " :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </label>
      </Field>
      <Field name="town" label="town">
        <label class="memberPage_setting_label">
          <a>{{ $t('鄉鎮') }}</a>
          <div class="memberPage_setting_input">
            <select v-model="selectedTownOption">
              <option v-for="( option, index ) in  cityTownData.town " :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </label>
      </Field>
      <Field name="addres" label="addres" v-model="userList.addres" rules="required" v-slot="{ field }">
        <label class="memberPage_setting_label">
          <a>{{ $t('地址') }}</a>
          <div class="memberPage_setting_input">
            <input type="text" v-bind="field" autocomplete="off" />
          </div>
          <ErrorMessage name="addres" v-slot="{ message }">
            <a class="memberPage_input_errorText">{{ $t(message) }}</a>
          </ErrorMessage>
        </label>
      </Field>
      <Field name="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
        <label class="memberPage_setting_label">
          <a>{{ $t('電話') }}</a>
          <div class="memberPage_setting_input">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="phone" v-slot="{ message }">
              <a class="memberPage_input_errorText">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <Field name="mail" v-model="userList.mail" rules="mail" v-slot="{ field }">
        <label class="memberPage_setting_label">
          <a>{{ $t('郵箱') }}</a>
          <div class="memberPage_setting_input">
            <input type="text" v-bind="field" autocomplete="off" />
            <ErrorMessage name="mail" v-slot="{ message }">
              <a class="memberPage_input_errorText">{{ $t(message) }}</a>
            </ErrorMessage>
          </div>
        </label>
      </Field>
      <div class="memberPage_setting_button">
        <button type="submit">{{ $t('變更') }}</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "./style";
</style>