import { defineStore } from 'pinia';

export const useStore = defineStore('Main', {
  state: () => ({
    isAlertBoxComfirm: false,
    AlertMessage: '',

    isCheckLogin: false,
    isloading: false,

    isNotification: false,
    NotificationMessage: '',
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
