import router from "@/router";
import { statisticalProgramService } from "@/services";

const state = {
  statisticalPrograms: [],
  statisticalProgram: null,
};

const mutations = {
  SET_STATISTICAL_PROGRAMS(state, statisticalPrograms) {
    state.statisticalPrograms = statisticalPrograms ? statisticalPrograms : [];
  },
  SET_STATISTICAL_PROGRAM(state, statisticalProgram) {
    state.statisticalProgram = statisticalProgram;
  },
};

const actions = {
  findAll({ commit }) {
    statisticalProgramService.findAll().then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAMS", data);
        commit("SET_STATISTICAL_PROGRAM", null); //clear statistical process
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    statisticalProgramService.findById(id).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    statisticalProgramService.findByName(name).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAMS", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    statisticalProgramService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical process saved!", {
          root: true,
        });
        router.push("/metadata/referential/edit/" + data.id + "?step=3");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    statisticalProgramService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical process deleted!", {
          root: true,
        });
        router.push("/metadata/referential");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    statisticalProgramService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical process updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  updateOwner({ commit }, formData) {
    statisticalProgramService.updateOwner(formData).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  updateMaintainer({ commit }, formData) {
    statisticalProgramService.updateMaintainer(formData).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  updateContact({ commit }, formData) {
    statisticalProgramService.updateContact(formData).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addLegislativeReference({ commit }, formData) {
    statisticalProgramService.addLegislativeReference(formData).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeLegislativeReference({ commit }, formData) {
    statisticalProgramService.removeLegislativeReference(formData).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addStatisticalStandard({ commit }, formData) {
    statisticalProgramService.addStatisticalStandard(formData).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeStatisticalStandard({ commit }, formData) {
    statisticalProgramService.removeStatisticalStandard(formData).then(
      (data) => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  statisticalPrograms: (state) => {
    return state.statisticalPrograms;
  },
  viewStatisticalPrograms: (state) => {
    var viewStatisticalPrograms = [];
    for (var sp of state.statisticalPrograms) {
      viewStatisticalPrograms.push({
        id: sp.id,
        localId: sp.localId,
        name: sp.name,
        acronym: sp.acronym,
        description: sp.description,
        owner: sp.owner ? sp.owner.name : "",
        maintainer: sp.maintainer ? sp.maintainer.name : "",
        contact: sp.contact ? sp.contact.name : "",
      });
    }
    return viewStatisticalPrograms;
  },
  statisticalProgram: (state) => {
    return state.statisticalProgram;
  },
};

export const statisticalProgram = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
