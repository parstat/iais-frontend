import router from "@/router";
import { AuthStatus } from "@/common";

const state = {
  code: null,
  msg: null
};

const mutations = {
  SET_CODE(state, code) {
    state.code = code;
  },
  SET_MSG(state, msg) {
    state.msg = msg;
  }
};

const actions = {
  multipleLogin({ commit }) {
    commit("SET_STATUS", AuthStatus.MultipleLogin);
    router.push("/login");
  },
  tokenExpired({ commit }) {
    commit("SET_STATUS", AuthStatus.TokenExpired);
    router.push("/login");
  },
  unauthorized({ commit }, error) {
    commit("SET_CODE", error.code);
    commit("SET_MSG", error.message);
    router.push("/unauthorized");
  },
  serverError({ commit }, error) {
    commit("SET_CODE", error.code);
    commit("SET_MSG", error.message);
    router.push("/error");
  }
};

const getters = {
  code: state => {
    return state.code;
  },
  msg: state => {
    return state.msg;
  }
};

export const error = {
  state,
  mutations,
  actions,
  getters
};
