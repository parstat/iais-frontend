//import router from "@/router";
import { unitDataSetService } from "@/services";
import router from "@/router";

const state = {
  unitDataSets: [],
  unitDataSet: null,
};

const mutations = {
  SET_UNITDATASETS(state, unitDataSets) {
    state.unitDataSets = unitDataSets ? unitDataSets : [];
  },
  SET_UNITDATASET(state, unitDataSet) {
    state.unitDataSet = unitDataSet;
  },
};

const actions = {
  findAll({ commit }) {
    unitDataSetService.findAll().then(
      (data) => {
        commit("SET_UNITDATASETS", data);
        commit("SET_UNITDATASET", null); //clear dataset
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    unitDataSetService.findById(id).then(
      (data) => {
        commit("SET_UNITDATASET", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    unitDataSetService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit Dataset saved!", {
          root: true,
        });
        router.push("/metadata/structural/unitDataSets");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    unitDataSetService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit Dataset deleted!", {
          root: true,
        });
        router.push("/metadata/structural/unitDataSets");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    unitDataSetService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit Dataset updated!", {
          root: true,
        });
        router.push("/metadata/structural/unitDataSets");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  unitDataSets: (state) => {
    return state.unitDataSets;
  },
  unitDataSet: (state) => {
    return state.unitDataSet;
  },
};

export const unitDataSet = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
