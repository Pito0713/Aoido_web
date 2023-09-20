<script setup>
import { ref, onMounted, reactive, watch, provide } from 'vue'
import { useForm } from 'vee-validate';
import DatePicker from 'vue3-datepicker';
import Cookies from 'js-cookie';
import moment from 'moment';

import Service from "@SERVICE/service";
import { useStore } from '@STORE/main';

const { form } = useForm()
const store = useStore();

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

const countyData = reactive({
  data: {}
});

const cityTownData = reactive({
  city: '',
  town: '',
});

const fileInput = ref(null);
const fileData = ref(null);
const imagePreviewUrl = ref(null);
const infoStatus = ref(true);
const isUploadFile = ref(true);
const selectedCityOption = ref('')
const selectedTownOption = ref('')
const selectedlanguage = ref(Cookies.get('language'))

// Img upload
const onFileInputChange = (event) => {
  const files = event.target.files;
  // file type & size 
  if (files && ['image/jpg', 'image/jpeg', 'image/png'].includes(files[0].type) && files[0].size < 1 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(files[0]);
    fileData.value = files[0];
    store.isAlertBoxComfirmChange(true);
    store.AlertMessageChange('圖片確認完成, 需執行圖片變更')
    isUploadFile.value = false
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

// memeber info
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
    userList.birth = new Date(response?.data[0].birth)
    userList.phone = response?.data[0].phone
    userList.addres = response?.data[0].addres
    userList.mail = response?.data[0].mail
    userList.photo = response?.data[0].photo
    selectedCityOption.value = response?.data[0].city
    selectedTownOption.value = response?.data[0].town
  }
  store.isloadingChange(false)
}

// county
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
  cityTownData.town = countyData.data[selectedCityOption.value]
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) selectedTownOption.value = ''
});

watch(selectedlanguage, (newValue, oldValue) => {
  if (!['', null, undefined].includes(oldValue) && newValue !== oldValue) {
    store.defaultLanguageChange(newValue)
  }
});

onMounted(() => {
  postUserinfo()
  getCountyItems()
});

// props update
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
        <template v-if="isUploadFile">
          <label class="memberPage_img_container_button">
            <a>{{ $t('個人圖片變更') }}</a>
            <input type="file" ref="fileInput" style="display:none;" @change="onFileInputChange" />
          </label>
        </template>
        <template v-else>
          <button class="memberPage_img_container_button" @click="uploadFile"><a>{{ $t('個人圖片儲存') }}</a></button>
        </template>
      </div>
    </div>
    <div class="memberPage_Item">
      <form class="memberPage_Item_container">
        <Field name="uesrName" v-model="userList.uesrName" rules="required" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('名字') }}</a>
            <div class="memberPage_Item_input">
              <input type="text" v-bind="field" :disabled="infoStatus" />
            </div>
          </label>
        </Field>
        <Field name="birth" label="birth">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('生日') }}</a>
            <div class="memberPage_Item_input">
              <DatePicker class="DatePicker" :disabled="infoStatus"
                style="width: 200px; border: 1px solid var(--border-color); height: 3rem; padding-left: 10px;"
                v-model="userList.birth" :value="moment(userList.birth).format('YYYY / MM / DD')">
              </DatePicker>
            </div>
          </label>
        </Field>
        <Field name="city" label="city">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('縣市') }}</a>
            <div class="memberPage_Item_input">
              <select v-model="selectedCityOption" :disabled="infoStatus">
                <option v-for="(option, index) in cityTownData.city" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </label>
        </Field>
        <Field name="town" label="town">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('鄉鎮') }}</a>
            <div class="memberPage_Item_input">
              <select v-model="selectedTownOption" :disabled="infoStatus">
                <option v-for="(option, index) in cityTownData.town" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </label>
        </Field>
        <Field name="addres" label="addres" v-model="userList.addres" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('地址') }}</a>
            <div class="memberPage_Item_input">
              <input type="text" v-bind="field" :disabled="infoStatus" />
            </div>
          </label>
        </Field>
        <Field name="phone" v-model="userList.phone" rules="phone" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('電話') }}</a>
            <div class="memberPage_Item_input">
              <input type="text" v-bind="field" autocomplete="off" :disabled="infoStatus" />
            </div>
          </label>
        </Field>
        <Field name="mail" label="mail" v-model="userList.mail" rules="required|mail" v-slot="{ field }">
          <label class="memberPage_Item_content">
            <a class="memberPage_Item_label">{{ $t('郵箱') }}</a>
            <div class="memberPage_Item_input">
              <input class="memberPage_Item_input" type="text" v-bind="field" :disabled="infoStatus" />
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