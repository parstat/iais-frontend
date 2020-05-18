import router from "@/router";
import { statisticalProgramService } from "@/services";

const state = {
  statisticalPrograms: [],
  statisticalProgram: null
};

const mutations = {
  SET_STATISTICAL_PROGRAMS(state, statisticalPrograms) {
    state.statisticalPrograms = statisticalPrograms;
  },
  SET_STATISTICAL_PROGRAM(state, statisticalProgram) {
    state.statisticalProgram = statisticalProgram;
  }
};

const actions = {
  getAll({ commit, getters }) {
    statisticalProgramService.getAll(getters.token).then(
      data => {
        commit("SET_STATISTICAL_PROGRAMS", data);
        commit("SET_STATISTICAL_PROGRAM", null); //clear statistical process
      },
      error => {
        console.log(error);
      }
    );
  },
  getById({ commit }, id) {
    statisticalProgramService.getById(id).then(
      data => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    statisticalProgramService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical process saved!", {
          root: true
        });
        router.push("/metadata/referential");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    statisticalProgramService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical process deleted!", {
          root: true
        });
        router.push("/metadata/referential");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    statisticalProgramService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical process updated!", {
          root: true
        });
        router.push("/metadata/referential");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  statisticalPrograms: state => {
    return state.statisticalPrograms;
  },
  statisticalProgram: state => {
    return state.statisticalProgram;
  }
};

export const statisticalProgram = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
