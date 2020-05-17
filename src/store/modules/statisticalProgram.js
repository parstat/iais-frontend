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
  getStatisticalPrograms({ commit, getters }) {
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
  getStatisticalProgramById({ commit }, id) {
    statisticalProgramService.getById(id).then(
      data => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  saveStatisticalProgram({ dispatch }, formData) {
    statisticalProgramService.save(formData).then(
      data => {
        console.log(data);
        dispatch("success", "Statistical process saved!");
        router.push("/metadata/referential");
      },
      error => {
        console.log(error);
      }
    );
  },
  deleteStatisticalProgram({ dispatch }, id) {
    statisticalProgramService.delete(id).then(
      data => {
        console.log(data);
        dispatch("success", "Statistical process deleted!");
        router.push("/metadata/referential");
      },
      error => {
        console.log(error);
      }
    );
  },
  updateStatisticalProgram({ dispatch }, formData) {
    statisticalProgramService.update(formData).then(
      data => {
        console.log(data);
        dispatch("success", "Statistical process updated!");
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
  state,
  mutations,
  actions,
  getters
};
