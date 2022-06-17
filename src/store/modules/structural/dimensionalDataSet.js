//import router from "@/router";
import { dimensionalDataSetService } from "@/services";
// import router from "@/router";

const state = {
  dimensionalDataSets: [],
  dimensionalDataSet: null,
};

const mutations = {
  SET_DIMENTIONALDATASETS(state, dimensionalDataSets) {
    state.dimensionalDataSets = dimensionalDataSets ? dimensionalDataSets : [];
  },
  SET_DIMENTIONALDATASET(state, dimensionalDataSet) {
    state.dimensionalDataSet = dimensionalDataSet;
  },
};

const actions = {
  findAll({ commit }) {
    dimensionalDataSetService.findAll().then(
      (data) => {
        commit("SET_DIMENTIONALDATASETS", data);
        commit("SET_DIMENTIONALDATASET", null); //clear dataset
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    dimensionalDataSetService.findById(id).then(
      (data) => {
        commit("SET_DIMENTIONALDATASET", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // save({ dispatch }, formData) {
  //   dimensionalDataSetService.save(formData).then(
  //     (data) => {
  //       console.log(data);
  //       dispatch("message/success", "Unit Dataset saved!", {
  //         root: true,
  //       });
  //       router.push("/metadata/structural/dimensionalDataSets");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // },
  // delete({ dispatch }, id) {
  //   dimensionalDataSetService.delete(id).then(
  //     (data) => {
  //       console.log(data);
  //       dispatch("message/success", "Unit Dataset deleted!", {
  //         root: true,
  //       });
  //       router.push("/metadata/structural/dimensionalDataSets");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // },
  // update({ dispatch }, formData) {
  //   dimensionalDataSetService.update(formData).then(
  //     (data) => {
  //       console.log(data);
  //       dispatch("message/success", "Unit Dataset updated!", {
  //         root: true,
  //       });
  //       router.push("/metadata/structural/dimensionalDataSets");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // },
};

const getters = {
  dimensionalDataSets: (state) => {
    return state.dimensionalDataSets;
  },
  dimensionalDataSet: (state) => {
    return state.dimensionalDataSet;
  },
};

export const dimensionalDataSet = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
