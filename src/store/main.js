import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

import Service from '@SERVICE/service';

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
    },
    isNotificationChange(e) {
      this.isNotification = e;
      setTimeout(() => {
        this.isNotification = !e;
      }, 2000);
    },
    AlertMessageChange(e) {
      this.AlertMessage = e;
    },
    NotificationMessageChange(e) {
      this.NotificationMessage = e;
    },
    isCheckLoginChange(e) {
      this.isCheckLogin = e;
    },
    isloadingChange(e) {
      this.isloading = e;
    },
  },
});
