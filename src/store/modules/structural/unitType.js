//import router from "@/router";
import { unitTypeService } from "@/services";
import router from "@/router";

const state = {
  unitTypes: [],
  unitType: null,
};

const mutations = {
  SET_UNITTYPES(state, unitTypes) {
    state.unitTypes = unitTypes ? unitTypes : [];
  },
  SET_UNITTYPE(state, unitType) {
    state.unitType = unitType;
  },
};

const actions = {
  findAll({ commit }) {
    unitTypeService.findAll().then(
      (data) => {
        commit("SET_UNITTYPES", data);
        commit("SET_UNITTYPE", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    unitTypeService.findById(id).then(
      (data) => {
        commit("SET_UNITTYPE", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    unitTypeService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit type saved!", {
          root: true,
        });
        router.push("/metadata/structural/unitTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    unitTypeService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit type deleted!", {
          root: true,
        });
        router.push("/metadata/structural/unitTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    unitTypeService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Unit type updated!", {
          root: true,
        });
        router.push("/metadata/structural/unitTypes");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  unitTypes: (state) => {
    return state.unitTypes;
  },
  unitType: (state) => {
    return state.unitType;
  },
};

export const unitType = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
