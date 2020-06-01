import router from "@/router";
import { businessFunctionService } from "@/services";

const state = {
  businessFunctions: [],
  businessFunction: null
};

const mutations = {
  SET_BUSINESS_FUNCTIONS(state, businessFunctions) {
    state.businessFunctions = businessFunctions;
  },
  SET_BUSINESS_FUNCTION(state, businessFunction) {
    state.businessFunction = businessFunction;
  }
};

const actions = {
  findAll({ commit }) {
    businessFunctionService.findAll().then(
      data => {
        commit("SET_BUSINESS_FUNCTIONS", data);
        commit("SET_BUSINESS_FUNCTION", null); //clear business function
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    businessFunctionService.findById(id).then(
      data => {
        commit("SET_BUSINESS_FUNCTION", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    businessFunctionService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business Function saved!", {
          root: true
        });
        router.push("/metadata/referential/gsim/function");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    businessFunctionService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business Function deleted!", {
          root: true
        });
        router.push("/metadata/referential/gsim/function");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    businessFunctionService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business Function updated!", {
          root: true
        });
        router.push("/metadata/referential/gsim/function");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  businessFunctions: state => {
    return state.businessFunctions;
  },
  businessFunction: state => {
    return state.businessFunction;
  }
};

export const businessFunction = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
