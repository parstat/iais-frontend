import router from "@/router";
import { processDocumentationService } from "@/services";

const state = {
  processDocumentations: [],
  processDocumentation: null
};

const mutations = {
  SET_PROCESS_DOCUMENTATIONS(state, processDocumentations) {
    state.processDocumentations = processDocumentations
      ? processDocumentations
      : [];
  },
  SET_PROCESS_DOCUMENTATION(state, processDocumentation) {
    state.processDocumentation = processDocumentation;
  }
};

const actions = {
  findById({ commit }, id) {
    processDocumentationService.findById(id).then(
      data => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    processDocumentationService.findByName(name).then(
      data => {
        commit("SET_PROCESS_DOCUMENTATIONS", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    processDocumentationService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Process Documentation saved!", {
          root: true
        });
        //router.push(
        //  "/metadata/referential/documentation/edit/" + data.id + "?step=2"
        //);
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    processDocumentationService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical process deleted!", {
          root: true
        });
        router.push("/metadata/referential/documentation");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    processDocumentationService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Process documentation updated!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  updateMaintainer({ commit }, formData) {
    processDocumentationService.updateMaintainer(formData).then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  },
  addStatisticalStandard({ commit }, formData) {
    processDocumentationService.addStatisticalStandard(formData).then(
      data => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  removeStatisticalStandard({ commit }, formData) {
    processDocumentationService.removeStatisticalStandard(formData).then(
      data => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  processDocumentations: state => {
    return state.processDocumentations;
  },
  processDocumentation: state => {
    return state.processDocumentation;
  }
};

export const processDocumentation = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
