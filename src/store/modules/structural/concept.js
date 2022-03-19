import { conceptService } from "@/services";
// import router from "@/router";

const state = {
  concepts: [],
  concept: null,
};

const mutations = {
  SET_CONCEPTS(state, concepts) {
    state.concepts = concepts ? concepts : [];
  },
  SET_CONCEPT(state, concept) {
    state.concept = concept;
  },
};

const actions = {
  findAll({ commit }) {
    conceptService.findAll().then(
      (data) => {
        commit("SET_CONCEPTS", data);
        commit("SET_CONCEPT", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    conceptService.findById(id).then(
      (data) => {
        commit("SET_CONCEPT", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  concepts: (state) => {
    return state.concepts;
  },
  concept: (state) => {
    return state.concept;
  },
};

export const concept = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
