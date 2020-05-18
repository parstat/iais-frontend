import jwt from "jsonwebtoken";
import router from "@/router";
import { authService } from "@/services";
import { Role } from "@/common";
import { Agent } from "@/common";
import { AuthStatus } from "@/common";

const state = {
  token: localStorage.getItem("token") || null,
  user: null,
  status: null,
  errorMsg: null
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
  },
  SET_ERROR_MSG(state, errorMsg) {
    state.errorMsg = errorMsg;
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

        commit("SET_STATUS", AuthStatus.Logged);

        router.push("/"); //Go to main page
      },
      error => {
        console.log(error);
        commit("SET_STATUS", AuthStatus.InvalidCredentials);
        commit("SET_ERROR_MSG", "Incorrect username or password!");
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

      commit("SET_STATUS", AuthStatus.Logged);
    }
  },
  register({ commit, dispatch }, authData) {
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

        commit("SET_STATUS", AuthStatus.Logged);

        //Save agent
        const agentData = {
          name: user.name,
          description: "",
          account: user.user,
          type: Agent.Individual,
          localId: user.email
        };
        dispatch("saveAgent", agentData);

        router.push("/"); //Go to main page
      },
      error => {
        console.log(error);
        commit("SET_STATUS", AuthStatus.UserExists);
      }
    );
  },
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
    router.push("/");
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
  },
  errorMsg: state => {
    return state.errorMsg;
  },
  isAdmin: state => {
    return state.user.role == Role.Admin;
  },
  isUser: state => {
    return state.user.role == Role.User;
  }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
