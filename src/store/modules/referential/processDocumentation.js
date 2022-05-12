import router from "@/router";
import { processDocumentationService } from "@/services";

const state = {
  processDocumentations: [],
  processDocumentation: null,
};

const mutations = {
  SET_PROCESS_DOCUMENTATIONS(state, processDocumentations) {
    state.processDocumentations = processDocumentations
      ? processDocumentations
      : [];
  },
  SET_PROCESS_DOCUMENTATION(state, processDocumentation) {
    state.processDocumentation = processDocumentation
      ? processDocumentation
      : null;
  },
};

const actions = {
  findById({ commit }, id) {
    processDocumentationService.findById(id).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findLatest({ commit }, query) {
    processDocumentationService.findLatest(query.program, query.function).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    processDocumentationService.findByName(name).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATIONS", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    processDocumentationService.save(formData).then(
      (data) => {
        dispatch("message/success", "Process Documentation saved!", {
          root: true,
        });
        router.push(
          "/metadata/referential/documentation/edit/" + data.id + "?step=2"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  clone({ dispatch }, formData) {
    processDocumentationService.clone(formData).then(
      (data) => {
        dispatch("message/success", "Process Documentation saved!", {
          root: true,
        });
        router.push(
          "/metadata/referential/documentation/edit/" + data.id + "?step=2"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    processDocumentationService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Process documentation deleted!", {
          root: true,
        });
        router.push("/metadata/referential/documentation");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    processDocumentationService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Process documentation updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  addMaintainer({ commit }, formData) {
    processDocumentationService.addMaintainer(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeMaintainer({ commit }, formData) {
    processDocumentationService.removeMaintainer(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addStatisticalStandard({ commit }, formData) {
    processDocumentationService.addStatisticalStandard(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeStatisticalStandard({ commit }, formData) {
    processDocumentationService.removeStatisticalStandard(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addProcessMethod({ commit }, formData) {
    processDocumentationService.addProcessMethod(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeProcessMethod({ commit }, formData) {
    processDocumentationService.removeProcessMethod(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addBusinessService({ commit }, formData) {
    processDocumentationService.addBusinessService(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeBusinessService({ commit }, formData) {
    processDocumentationService.removeBusinessService(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addProcessInput({ commit }, formData) {
    processDocumentationService.addProcessInput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  editProcessInput({ commit }, formData) {
    processDocumentationService.editProcessInput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeProcessInput({ commit }, formData) {
    processDocumentationService.removeProcessInput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addProcessOutput({ commit }, formData) {
    processDocumentationService.addProcessOutput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  editProcessOutput({ commit }, formData) {
    processDocumentationService.editProcessOutput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeProcessOutput({ commit }, formData) {
    processDocumentationService.removeProcessOutput(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addProcessQuality({ commit }, formData) {
    processDocumentationService.addProcessQuality(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeProcessQuality({ commit }, formData) {
    processDocumentationService.removeProcessQuality(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addProcessDocument({ commit }, formData) {
    processDocumentationService.addProcessDocument(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeProcessDocument({ commit }, formData) {
    processDocumentationService.removeProcessDocument(formData).then(
      (data) => {
        commit("SET_PROCESS_DOCUMENTATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  processDocumentations: (state) => {
    return state.processDocumentations;
  },
  processDocumentation: (state) => {
    return state.processDocumentation;
  },
};

export const processDocumentation = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
