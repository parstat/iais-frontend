// import router from "@/router";
import { variableRepresentationService } from "@/services";

const state = {
  variableRepresentations: [],
  variableRepresentation: null,
};

const mutations = {
  SET_VARIABLE_REPRESENTATIONS(state, variableRepresentations) {
    state.variableRepresentations = variableRepresentations
      ? variableRepresentations
      : [];
  },
  SET_VARIABLE_REPRESENTATION(state, variableRepresentation) {
    state.variableRepresentation = variableRepresentation;
  },
};

const actions = {
  findAll({ commit }) {
    variableRepresentationService.findAll().then(
      (data) => {
        commit("SET_VARIABLE_REPRESENTATIONS", data);
        commit("SET_VARIABLE_REPRESENTATION", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    variableRepresentationService.findById(id).then(
      (data) => {
        commit("SET_VARIABLE_REPRESENTATION", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    variableRepresentationService.findByLocalId(localId).then(
      (data) => {
        commit("SET_VARIABLE_REPRESENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    variableRepresentationService.findByName(name).then(
      (data) => {
        commit("SET_VARIABLE_REPRESENTATIONS", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addRepresentation({ dispatch }, formData) {
    variableRepresentationService.addRepresentation(formData).then(() => {
      dispatch("message/success", "Representation added", {
        root: true,
      });
    });
  },
  updateRepresentation({ dispatch }, formData) {
    console.log(formData);
    variableRepresentationService.updateRepresentation(formData).then(
      () => {
        dispatch("message/success", "Variable Representation updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  deleteRepresentation({ dispatch }, id) {
    variableRepresentationService.delete(id).then(
      () => {
        dispatch("message/success", "Variable Representation deleted!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  variableRepresentations: (state) => {
    return state.variableRepresentations;
  },
  variableRepresentation: (state) => {
    return state.variableRepresentation;
  },
};

export const variableRepresentation = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
