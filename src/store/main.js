import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useStore = defineStore('Main', {
  state: () => ({
    APILoading: false,
    isAlertBoxComfirm: false,
    isCheckLogin: false,
    isloading: false,
    isNotification: false,
    AlertMessage: '123',
    NotificationMessage: '123',
    // counter: Cookies.get('counter') ? Cookies.get('counter') : 1,
  }),
  getters: {},
  actions: {
    isAlertBoxComfirmChange(e) {
      this.isAlertBoxComfirm = e;
      console.log(e);
    },
    isNotificationChange(e) {
      this.isNotification = e;
      console.log(e);
      setTimeout(() => {
        this.isNotification = !e;
      }, 2000);
    },
    AlertMessageChange(e) {
      this.AlertMessage = e;
      console.log(e);
    },
    NotificationMessageChange(e) {
      this.NotificationMessage = e;
      console.log(e);
    },
    isCheckLoginChange(e) {
      this.isCheckLogin = e;
      console.log(e, 'isCheckLoginChange');
    },
    isloadingChange(e) {
      this.isloading = e;
      console.log(e, 'isloadingChange');
    },

    // increment() {
    //   this.counter++;
    //   Cookies.set('counter', this.counter);
    // },
    // randomizeCounter() {
    //   this.counter = Math.round(100 * Math.random());
    // },
  },
});
