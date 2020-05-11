import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { statisticalProgram } from "./modules/statisticalProgram";
import { agent } from "./modules/agent";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    coreui,
    message,
    statisticalProgram,
    agent
  }
});
