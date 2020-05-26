import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { statisticalProgram } from "./modules/referential/statisticalProgram";
import { agent } from "./modules/referential/agent";
import { legislativeReference } from "./modules/referential/legislativeReference";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    statisticalProgram,
    agent,
    legislativeReference
  }
});
