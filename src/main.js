import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import pinia from './store/index';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';

// 設置全局配置
configure({
  validateOnInput: true,
});

defineRule('required', (value) => {
  if (!value || !value.length) {
    return '必須記入';
  }
  return true;
});

defineRule('email', (value) => {
  const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  let isValidEmail = emailRegex.test(value);
  if (!isValidEmail) {
    return 'メールアドレス必須です';
  }
  return true;
});

createApp(App)
  .use(router)
  .use(pinia)

  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
