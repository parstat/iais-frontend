import router from "@/router";
import { variableService } from "@/services";

const state = {
  variables: [],
  variable: null
};

const mutations = {
  SET_VARIABLES(state, variables) {
    state.variables = variables ? variables : [];
  },
  SET_VARIABLE(state, variable) {
    state.variable = variable;
  }
};

const actions = {
  findAll({ commit }) {
    variableService.findAll().then(
      data => {
        commit("SET_VARIABLES", data);
        commit("SET_VARIABLE", null); //clear business function
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    variableService.findById(id).then(
      data => {
        commit("SET_VARIABLE", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    variableService.findByLocalId(localId).then(
      data => {
        commit("SET_VARIABLE", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    variableService.findByName(name).then(
      data => {
        commit("SET_VARIABLES", data);
        //commit("SET_BUSINESS_FUNCTION", null); //clear business function
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    variableService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Variable saved!", {
          root: true
        });
        router.push("/metadata/structuralal/variable");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    variableService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Variable deleted!", {
          root: true
        });
        router.push("/metadata/structuralal/variable");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    variableService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Variable updated!", {
          root: true
        });
        router.push("/metadata/structuralal/variable");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  variables: state => {
    return state.variables;
  },
  variable: state => {
    return state.variable;
  }
};

export const variable = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
