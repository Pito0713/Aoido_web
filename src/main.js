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
    return '必須記入';
  }
  return true;
});

defineRule('account', (value) => {
  const accountRegex = /^[a-zA-Z0-9]+$/;
  let isValidAccount = accountRegex.test(value);
  if (!isValidAccount) {
    return '数字と英字を含んでいる必要があります';
  }
  return true;
});

defineRule('password', (value) => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  const passwordLengthRegex = /^\d{6,12}$/;
  let isValidPassword = passwordRegex.test(value);
  let isValidPasswordLength = passwordLengthRegex.test(value);
  if (!isValidPassword) {
    return '数字と英字を含んでいる必要があります';
  }
  if (!isValidPasswordLength) {
    return '6桁から12桁までのパスワードを入力してください。';
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

defineRule('phone', (value) => {
  const phoneRegex = /^\d{10}$/;
  let isValidPhone = phoneRegex.test(value);
  if (!isValidPhone) {
    return '正しい電話番号を入力してください';
  }
  return true;
});

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return '新しいパスワードと異なります';
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)

  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
