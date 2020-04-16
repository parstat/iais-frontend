import router from "@/router";
import { authService } from "@/services";

const state = {
  idToken: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  status: null //[LOGGED, INVALID_CREDENTIALS, USER_EXISTS]
};

const mutations = {
  AUTH_USER(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;

    //store auth data in browser storage
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userId", userData.userId);
  },
  CLEAR_AUTH_DATA(state) {
    state.idToken = null;
    state.userId = null;

    //remove auth data from browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
  SET_STATUS(state, status) {
    state.status = status;
  }
};

const actions = {
  login({ commit }, authData) {
    authService.login(authData).then(
      data => {
        commit("AUTH_USER", {
          token: data.idToken,
          userId: data.localId
        });

        commit("SET_STATUS", "LOGGED");

        router.push("/"); //Go to main page
      },
      error => {
        console.log(error);
        commit("SET_STATUS", "INVALID_CREDENTIALS");
      }
    );
  },
  register({ commit }, authData) {
    authService.register(authData).then(
      data => {
        commit("AUTH_USER", {
          token: data.idToken,
          userId: data.localId
        });

        commit("SET_STATUS", "LOGGED");

        router.push("/"); //Go to main page
      },
      error => {
        console.log(error);
        commit("SET_STATUS", "USER_EXISTS");
      }
    );
  },
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
    router.push("/login");
  }
};
const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },
  token(state) {
    return state.idToken;
  },
  status(state) {
    return state.status;
  }
};

export const auth = {
  state,
  actions,
  mutations,
  getters
};
