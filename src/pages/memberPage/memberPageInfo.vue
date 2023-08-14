<script setup>
import { ref, onMounted, reactive, watch, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate';
import DatePicker from 'vue3-datepicker';
import Cookies from 'js-cookie';

import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';
import { LANGUAGE_LIST } from '../../configs/site'

const { handleSubmit, form, errors } = useForm()
const store = useStore();
const router = useRouter()

const userList = reactive({
  uesrName: '',
  birth: new Date(),
  phone: '',
  addres: '',
  mail: '',
  City: '',
  Town: '',
  photo: '',
})

const CountyData = reactive({
  data: {}
});

const CityTownData = reactive({
  City: '',
  Town: '',
});

const fileInput = ref(null);
const fileData = ref(null);
const imagePreviewUrl = ref(null);
const selectedCityOption = ref('')
const selectedTownOption = ref('')
const selectedlanguage = ref(Cookies.get('language'))

const onSubmit = handleSubmit((e) => {
  postUploadUser()
});

const onFileInputChange = (event) => {
  const files = event.target.files;
  if (files && ['image/jpg', 'image/jpeg', 'image/png'].includes(files[0].type) && files[0].size < 1 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(files[0]);
    fileData.value = files[0];
  } else {
    imagePreviewUrl.value = null;
    fileData.value = null;
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('圖像不支援')
  }
};

const uploadFile = async () => {
  if (!fileData.value) return;
  const formData = new FormData();
  formData.append('file', fileData.value);
  store.isloadingChange(true)

  const response = await Service.postUploadUserImage(formData);
  if (response?.status === 'success' && response?.data) {
    userList.photo = response.data.imageUrl
    postUploadUser()
  }
  store.isloadingChange(false)

};

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
    userList.addres = response?.data[0].addres
    userList.mail = response?.data[0].mail
    userList.photo = response?.data[0].photo
    selectedCityOption.value = response?.data[0].city
    selectedTownOption.value = response?.data[0].town
  }
  store.isloadingChange(false)
}

const getCountyItems = async () => {
  const response = await Service.getCountyItems();
  if (response?.status === 'success' && response?.data) {
    CountyData.data = response.data
    const City = Object.keys(response.data);
    CityTownData.City = City.filter((item) => { return item !== "_id" })
    CityTownData.Town = CountyData.data[selectedCityOption.value]
  }
}

const handleClick = () => {
  router.push({ name: 'memberPage_handPassWord' });
}

watch(selectedCityOption, (newValue, oldValue) => {
  CityTownData.Town = CountyData.data[selectedCityOption.value]
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) selectedTownOption.value = ''
});

watch(selectedlanguage, (newValue, oldValue) => {
  console.log(oldValue)
  console.log(newValue)
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) {
    store.defaultLanguageChange(newValue)
  }
});

onMounted(() => {
  postUserinfo()
  getCountyItems()
});

provide('userList', userList);

</script>

<template>
  <div class="memberPage_content">
    <div class="memberPage_img_container">
      <label class="memberPage_Upload">
        <div class="memberPage_Img">
          <template v-if="imagePreviewUrl">
            <img :src="imagePreviewUrl" />
          </template>
          <template v-else>
            <template v-if="userList.photo">
              <img :src="userList.photo" />
            </template>
            <template v-else>
              <img style="width: 40px;" src="../../assets/plus.svg" />
            </template>
          </template>
        </div>
        <input type="file" ref="fileInput" style="display:none;" @change="onFileInputChange" />
      </label>
      <div class="memberPage_img_container_group">
        <button class="memberPage_img_container_button" @click="uploadFile">{{ $t('個人圖片變更') }}</button>
        <button class="memberPage_img_container_button" @click="handleClick()">{{ $t('密碼變更') }}</button>
      </div>
    </div>
    <div class="memberPage_Item">
      <form @submit.prevent="onSubmit" class="memberPage_Item_container">
        <div class="memberPage_Item_button_title">
          <div class="memberPage_Item_container_group">
            <img class="memberPage_Item_button_title_img" src="../../assets/info.svg" />
            <select class="memberPage_Item_container_select" v-model="selectedlanguage">
              <option v-for="(item, index) in LANGUAGE_LIST" :key="index" :value="item.value">
                {{ item.lang }}
              </option>
            </select>
          </div>
          <button class="memberPage_Item_button" type="submit">{{ $t('變更') }}</button>
        </div>

        <Field name="uesrName" v-model="userList.uesrName" rules="required" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('名字') }}:</a>
            <div class="memberPage_Item_input">
              <input type="text" v-bind="field" />
              <ErrorMessage name="uesrName" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>

        <Field name="birth" label="birth">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('生日') }}:</a>
            <div class="memberPage_Item_input">
              <DatePicker v-model="userList.birth" style="width: 170px; height: 2rem; padding-left: 7.5px;"></DatePicker>
            </div>
          </label>
        </Field>

        <Field name="phone" label="phone" v-model="userList.phone" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('縣市/鄉鎮') }}:</a>
            <div class="memberPage_Item_input">
              <div class="memberPage_Item_select">
                <select style="width: 65px; height: 2rem; margin: 0px 10px;" v-model="selectedCityOption">
                  <option v-for="(option, index) in CityTownData.City" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
                <a> / </a>
                <select style="width: 65px; height: 2rem; margin: 0px 10px;" v-model="selectedTownOption">
                  <option v-for="(option, index) in CityTownData.Town" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </label>
        </Field>

        <Field name="addres" label="addres" v-model="userList.addres" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('地址') }}:</a>
            <div class="memberPage_Item_input">
              <input type="text" v-bind="field" />
            </div>
          </label>
        </Field>

        <Field name="mail" label="mail" v-model="userList.mail" rules="required|mail" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('郵箱') }}:</a>
            <div class="memberPage_Item_input">
              <input class="memberPage_Item_input" type="text" v-bind="field" />
              <ErrorMessage name="mail" v-slot="{ message }">
                <a class="createMember_errorMessage">{{ $t(message) }}</a>
              </ErrorMessage>
            </div>
          </label>
        </Field>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>