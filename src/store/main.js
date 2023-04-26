import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useStore = defineStore('Main', {
  state: () => ({
    APILoading: false,
    isAlertBox: false,
    isCheckLogin: false,
    AlertMessage: '123',
    // counter: Cookies.get('counter') ? Cookies.get('counter') : 1,
  }),
  getters: {},
  actions: {
    isAlertBoxChange(e) {
      this.isAlertBox = e;
      console.log(e);
    },
    AlertMessageChange(e) {
      this.AlertMessage = e;
      console.log(e);
    },
    isCheckLoginChange(e) {
      this.isCheckLogin = e;
      console.log(e, 'isCheckLoginChange');
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
