import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import pinia from './store/index';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import i18n from './i18';

// 設置全局配置
configure({
  validateOnInput: true,
});

defineRule('required', (value) => {
  if (!value || !value.length) {
    return '必填';
  }
  return true;
});

defineRule('account', (value) => {
  const accountRegex = /^[a-zA-Z0-9]+$/;
  const accountLengthRegex = /^.{3,12}$/;

  let isValidAccount = accountRegex.test(value);
  let isValidAccountLength = accountLengthRegex.test(value);
  if (!isValidAccount) {
    return '只能輸入数字或字母。';
  }
  if (!isValidAccountLength) {
    return '最少3個字數, 最多12個。';
  }
  return true;
});

defineRule('password', (value) => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  const passwordLengthRegex = /^.{6,12}$/;
  let isValidPassword = passwordRegex.test(value);
  let isValidPasswordLength = passwordLengthRegex.test(value);
  if (!isValidPassword) {
    return '只能輸入数字或字母。';
  }
  if (!isValidPasswordLength) {
    return '最少6個字數, 最多12個。';
  }
  return true;
});

defineRule('mail', (value) => {
  const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  let isValidEmail = emailRegex.test(value);
  if (!isValidEmail) {
    return '必須是郵箱格式。';
  }
  return true;
});

defineRule('phone', (value) => {
  const phoneRegex = /^\d{10}$/;
  let isValidPhone = phoneRegex.test(value);
  if (!isValidPhone) {
    return '電話格式有誤, 需10碼。';
  }
  return true;
});

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return '重複輸入的新密碼有誤。';
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)

  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
