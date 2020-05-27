import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueSpinners from "vue-spinners";

Vue.config.productionTip = false;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);
Vue.use(VueSpinners);
Vue.component("v-select", vSelect);

/* Material design icons*/
import "vue-material-design-icons/styles.css";
import ChevronRightBoxIcon from "icons/ArrowRightBold.vue";
import AddIcon from "icons/Plus.vue";
import EditIcon from "icons/Pencil.vue";
import DeleteIcon from "icons/TrashCanOutline.vue";
import TextIcon from "icons/TextBoxOutline.vue";
import AgentIcon from "icons/AccountOutline.vue";

Vue.component("chevron-right-icon", ChevronRightBoxIcon);
Vue.component("add-icon", AddIcon);
Vue.component("edit-icon", EditIcon);
Vue.component("delete-icon", DeleteIcon);
Vue.component("text-icon", TextIcon);
Vue.component("agent-icon", AgentIcon);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");
