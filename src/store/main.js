import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useStore = defineStore("Main", {
  state: () => ({
    APILoading: false,
    counter: Cookies.get("counter") ? Cookies.get("counter") : 1,
  }),
  getters: {},
  actions: {},
  actions: {
    increment() {
      this.counter++;
      Cookies.set("counter", this.counter);
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
});
