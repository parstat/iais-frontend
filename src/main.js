import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from "@/assets/icons/icons.js";
import { materialIconsSet as materialIcons } from "@/assets/icons/materialIcons.js";
import Vuelidate from "vuelidate";
import vSelect from "vue3-select";
import VueSpinners from "vue-spinners";

const app = createApp(App);
app.config.productionTip = false;

app.use(CoreuiVue);
app.use(Vuelidate);
app.use(VueSpinners);
app.use(store);
app.use(router);
app.component('CIcon', CIcon);
app.provide("icons", icons);
app.provide("iconsMaterial", materialIcons);
app.component("v-select", vSelect);

app.config.globalProperties.$filters = {
  truncateString(value) {
    if (value.length > 55) {
      return value.substring(0, 65) + "...";
    }
    return value;
  },
};

app.mount("#app");
