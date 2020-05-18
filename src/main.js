import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import axios from "axios";
import Vuelidate from "vuelidate";

axios.defaults.baseURL = process.env.VUE_APP_DEV_SERVER;

//request interceptor
axios.interceptors.request.use(
  config => {
    const token = store.getters["auth/token"];
    if (token && !("jwt-auth" in config.headers)) {
      config.headers["jwt-auth"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

//response interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("Error status", error.response.status);
    var err = {
      code: error.response.status,
      message: ""
    };
    // Unauthotized access
    if (error.response.status === 401) {
      //User logged
      if ("jwt-auth" in error.response.headers) {
        //redirect to login page
        store.dispatch("error/multipleLogin");
      } else {
        //unauthorized
        store.dispatch("error/unauthorized", err);
      }
    } else if (error.response.status === 500) {
      if (error.response.data.message.includes("AuthenticatedFilter")) {
        //redirect to login page
        store.dispatch("error/tokenExpired");
      } else {
        //internal server error
        err.message = error.response.data.message;
        store.dispatch("error/serverError", err);
      }
    }
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");
