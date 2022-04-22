import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue-pro";
import CIcon from "@coreui/icons-vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import { materialIconsSet as materialIcons } from "@/assets/icons/materialIcons.js";
import Multiselect from "@vueform/multiselect";
import vSelect from "vue3-select";
import VueSpinners from "vue-spinners";
import BootstrapVue3 from "bootstrap-vue-3";
import i18n from "./i18n";
import Datepicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "@vueform/multiselect/themes/default.css";

const app = createApp(App);
app.config.productionTip = false;

app.use(CoreuiVue);
app.use(VueSpinners);
app.use(store);
app.use(router);
app.use(i18n);
app.use(BootstrapVue3);
app.component("CIcon", CIcon);
app.provide("icons", icons);
app.provide("iconsMaterial", materialIcons);
app.component("v-select", vSelect);
app.component("m-select", Multiselect);
app.component("date-picker", Datepicker);

app.config.globalProperties.$filters = {
  truncateString(value) {
    if (value.length > 55) {
      return value.substring(0, 65) + "...";
    }
    return value;
  },
};

app.mount("#app");
