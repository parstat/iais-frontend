import { measurementUnitService } from "@/services";
import router from "@/router";

const state = {
  measurementUnits: [],
  measurementUnit: null,
};

const mutations = {
  SET_MEASUREMENTUNITS(state, measurementUnits) {
    state.measurementUnits = measurementUnits ? measurementUnits : [];
  },
  SET_MEASUREMENTUNIT(state, measurementUnit) {
    state.measurementUnit = measurementUnit;
  },
};

const actions = {
  findAll({ commit }) {
    measurementUnitService.findAll().then(
      (data) => {
        commit("SET_MEASUREMENTUNITS", data);
        commit("SET_MEASUREMENTUNIT", null);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    measurementUnitService.findById(id).then(
      (data) => {
        commit("SET_MEASUREMENTUNIT", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    measurementUnitService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Concept saved!", {
          root: true,
        });
        router.push("/metadata/structural/concepts");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    measurementUnitService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Concept updated!", {
          root: true,
        });
        router.push("/metadata/structural/concepts");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  measurementUnits: (state) => {
    return state.measurementUnits;
  },
  measurementUnit: (state) => {
    return state.measurementUnit;
  },
};

export const measurementUnit = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
