<script setup>
import memberPage_Item from './memberPage_Item.vue';
import memberPage_title from './memberPage_title.vue';
import memberPage_coupon from './memberPage_coupon.vue';
import { ref } from 'vue';

const List = [
  { item: 'name' },
  { item: 'birth' },
  { item: 'phone' },
  { item: 'address' },
  { item: 'mail' },
]

const fileInputRef = ref(null);
const selectedFile = ref(null);

function handleFileInputChange(e) {
  const target = e.target
  const files = target.files
  console.log(files)
  selectedFile.value = files[0];
}

function uploadFile() {
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  // 在这里可以使用 Axios 或其他 HTTP 库发送请求
  console.log('Uploading file...', formData.get('file'));
}


</script>

<template>
  <div class="memberPage_container">
    <memberPage_title class="memberPage_title" msg='template' />
    <div class="memberPage_content">
      <div class="memberPage_img_info">
        <div class="memberPage_Img">
        </div>
        <div class="memberPage_Input">
          <input type="file" ref="fileInput" @change="handleFileInputChange" />
          <button @click="uploadFile">Upload</button>
        </div>
      </div>
      <div class="memberPage_Item">
        <template v-for="(item, index) in List">
          <memberPage_Item :foo=item.item />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>