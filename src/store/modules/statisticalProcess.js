import router from "@/router";
import { statisticalProcessService } from "@/services";

const state = {
  statisticalProcesses: [],
  statisticalProcess: null
};

const mutations = {
  SET_STATISTICAL_PROCESSES(state, statisticalProcesses) {
    state.statisticalProcesses = statisticalProcesses;
  },
  SET_STATISTICAL_PROCESS(state, statisticalProcess) {
    state.statisticalProcess = statisticalProcess;
  }
};

const actions = {
  getStatisticalProcesses({ commit, getters, dispatch }) {
    statisticalProcessService.getAll(getters.token).then(
      data => {
        commit("SET_STATISTICAL_PROCESSES", data);
        commit("SET_STATISTICAL_PROCESS", null); //clear statistical process
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  getStatisticalProcessById({ commit, getters, dispatch }, id) {
    statisticalProcessService.getById(getters.token, id).then(
      data => {
        commit("SET_STATISTICAL_PROCESS", data);
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  saveStatisticalProcess({ getters, dispatch }, formData) {
    statisticalProcessService.save(getters.token, formData).then(
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
  deleteStatisticalProcess({ getters, dispatch }, formData) {
    statisticalProcessService.delete(getters.token, formData).then(
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
  updateStatisticalProcess({ getters, dispatch }, formData) {
    statisticalProcessService.update(getters.token, formData).then(
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
  statisticalProcesses: state => {
    return state.statisticalProcesses;
  },
  statisticalProcess: state => {
    return state.statisticalProcess;
  }
};

export const statisticalProcess = {
  state,
  mutations,
  actions,
  getters
};
