import router from "@/router";
import { processMethodService } from "@/services";

const state = {
  processMethods: [],
  processMethod: null
};

const mutations = {
  SET_PROCESS_METHODS(state, processMethods) {
    state.processMethods = processMethods;
  },
  SET_PROCESS_METHOD(state, processMethod) {
    state.processMethod = processMethod;
  }
};

const actions = {
  findAll({ commit }) {
    processMethodService.findAll().then(
      data => {
        commit("SET_PROCESS_METHODS", data);
        commit("SET_PROCESS_METHOD", null); //clear process method
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    processMethodService.findById(id).then(
      data => {
        commit("SET_PROCESS_METHOD", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    processMethodService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Process method saved!", {
          root: true
        });
        router.push("/metadata/referential/gsim/method");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    processMethodService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Method deleted!", {
          root: true
        });
        router.push("/metadata/referential/gsim/method");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    processMethodService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Method updated!", {
          root: true
        });
        router.push("/metadata/referential/gsim/method");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  processMethods: state => {
    return state.processMethods;
  },
  processMethod: state => {
    return state.processMethod;
  }
};

export const processMethod = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
