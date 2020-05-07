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
  getStatisticalPrograms({ commit, getters, dispatch }) {
    statisticalProgramService.getAll(getters.token).then(
      data => {
        commit("SET_STATISTICAL_PROGRAMS", data);
        commit("SET_STATISTICAL_PROGRAM", null); //clear statistical process
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  getStatisticalProgramById({ commit, dispatch }, id) {
    statisticalProgramService.getById(id).then(
      data => {
        commit("SET_STATISTICAL_PROGRAM", data);
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
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
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  deleteStatisticalProgram({ dispatch }, formData) {
    statisticalProgramService.delete(formData).then(
      data => {
        console.log(data);
        dispatch("success", "Statistical process deleted!");
        router.push("/metadata/referential");
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
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
        dispatch("error", "[" + error.status + "] " + error.message);
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
