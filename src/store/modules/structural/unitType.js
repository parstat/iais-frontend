//import router from "@/router";
import { unitTypeService } from "@/services";

const state = {
  unitTypes: [],
  unitType: null
};

const mutations = {
  SET_UNITTYPES(state, unitTypes) {
    state.unitTypes = unitTypes ? unitTypes : [];
  },
  SET_UNITTYPE(state, unitType) {
    state.unitType = unitType;
  }
};

const actions = {
  findAll({ commit }) {
    unitTypeService.findAll().then(
      data => {
        commit("SET_UNITTYPES", data);
        commit("SET_UNITTYPE", null); //clear business function
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    unitTypeService.findById(id).then(
      data => {
        commit("SET_UNITTYPE", data);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  unitTypes: state => {
    return state.unitTypes;
  },
  unitType: state => {
    return state.unitType;
  }
};

export const unitType = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
