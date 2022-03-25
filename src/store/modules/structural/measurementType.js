import { measurementTypeService } from "@/services";
import router from "@/router";

const state = {
  measurementTypes: [],
  measurementType: null,
};

const mutations = {
  SET_MEASUREMENT_TYPES(state, measurementTypes) {
    state.measurementTypes = measurementTypes ? measurementTypes : [];
  },
  SET_MEASUREMENT_TYPE(state, measurementType) {
    state.measurementType = measurementType;
  },
};

const actions = {
  findAll({ commit }) {
    measurementTypeService.findAll().then(
      (data) => {
        commit("SET_MEASUREMENT_TYPES", data);
        commit("SET_MEASUREMENT_TYPE", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    measurementTypeService.findById(id).then(
      (data) => {
        commit("SET_MEASUREMENT_TYPE", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    measurementTypeService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Measure type saved!", {
          root: true,
        });
        router.push("/metadata/structural/measurementTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    measurementTypeService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Measure type updated!", {
          root: true,
        });
        router.push("/metadata/structural/measurementTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    measurementTypeService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Measure type deleted!", {
          root: true,
        });
        router.push("/metadata/structural/measurementTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  measurementTypes: (state) => {
    return state.measurementTypes;
  },
  measurementType: (state) => {
    return state.measurementType;
  },
};

export const measurementType = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
