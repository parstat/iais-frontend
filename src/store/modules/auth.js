import jwt from "jsonwebtoken";
import router from "@/router";
import { authService } from "@/services";

const state = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,
  status: null //[LOGGED, INVALID_CREDENTIALS, USER_EXISTS]
};

const mutations = {
  AUTH_USER(state, { token, user }) {
    state.token = token;
    state.user = user;

    //store auth data in browser storage
    localStorage.setItem("token", token);
  },
  CLEAR_AUTH_DATA(state) {
    state.token = null;
    state.user = null;

    //remove auth data from browser storage
    localStorage.removeItem("token");
  },
  SET_STATUS(state, status) {
    state.status = status;
  }
};

const actions = {
  login({ commit }, authData) {
    authService.login(authData).then(
      data => {
        //decode JWT token
        var decoded = jwt.decode(data.token, { complete: true });
        const user = decoded.payload;
        console.log(user);

        commit("AUTH_USER", {
          token: data.token,
          user: user
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
  reloadCredentials({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      //decode JWT token
      var decoded = jwt.decode(token, { complete: true });
      const user = decoded.payload;
      console.log(user);

      commit("AUTH_USER", {
        token,
        user
      });

      commit("SET_STATUS", "LOGGED");
    }
  },
  register({ commit }, authData) {
    authService.register(authData).then(
      data => {
        //decode JWT token
        var decoded = jwt.decode(data.token, { complete: true });
        console.log(decoded.payload);
        const user = decoded.payload;

        commit("AUTH_USER", {
          token: data.token,
          user: user
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
  user: state => {
    return state.user;
  },
  isAuthenticated: state => {
    return state.token !== null;
  },
  token: state => {
    return state.token;
  },
  status: state => {
    return state.status;
  }
};

export const auth = {
  state,
  actions,
  mutations,
  getters
};
