import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import axios from "axios";
import Vuelidate from "vuelidate";

axios.defaults.baseURL = process.env.VUE_APP_DEV_SERVER;

axios.interceptors.request.use(config => {
  let token = store.getters.token;
  if (token && !("jwt-auth" in config.headers)) {
    config.headers["jwt-auth"] = token;
  }
  return config;
});

Vue.config.productionTip = false;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");
