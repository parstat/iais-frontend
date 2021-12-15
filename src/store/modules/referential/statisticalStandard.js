import router from "@/router";
import { statisticalStandardService } from "@/services";

const state = {
  statisticalStandards: [],
  statisticalStandard: null,
};

const mutations = {
  SET_STATISTICAL_STANDARDS(state, statisticalStandards) {
    state.statisticalStandards = statisticalStandards
      ? statisticalStandards
      : [];
  },
  SET_STATISTICAL_STANDARD(state, statisticalStandard) {
    state.statisticalStandard = statisticalStandard;
  },
};

const actions = {
  findAll({ commit }) {
    statisticalStandardService.findAll().then(
      (data) => {
        commit("SET_STATISTICAL_STANDARDS", data);
        commit("SET_STATISTICAL_STANDARD", null); //clear statistical standard
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    statisticalStandardService.findById(id).then(
      (data) => {
        commit("SET_STATISTICAL_STANDARD", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByName({ commit }, search) {
    statisticalStandardService.findByName(search).then(
      (data) => {
        console.log(data);
        commit("SET_STATISTICAL_STANDARDS", data);
        commit("SET_STATISTICAL_STANDARD", null); //clear statistical standard
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    statisticalStandardService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical standard saved!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/standard");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    statisticalStandardService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Standard deleted!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/standard");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    statisticalStandardService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Standard updated!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/standard");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  statisticalStandards: (state) => {
    return state.statisticalStandards;
  },
  statisticalStandard: (state) => {
    return state.statisticalStandard;
  },
};

export const statisticalStandard = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
