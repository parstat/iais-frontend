import router from "@/router";
import { legislativeReferenceService } from "@/services";

const state = {
  legislativeReferences: [],
  legislativeReference: null,
};

const mutations = {
  SET_LEGISLATIVE_REFERENCES(state, legislativeReferences) {
    state.legislativeReferences = legislativeReferences
      ? legislativeReferences
      : [];
  },
  SET_LEGISLATIVE_REFERENCE(state, legislativeReference) {
    state.legislativeReference = legislativeReference;
  },
};

const actions = {
  findAll({ commit }) {
    legislativeReferenceService.findAll().then(
      (data) => {
        commit("SET_LEGISLATIVE_REFERENCES", data);
        commit("SET_LEGISLATIVE_REFERENCE", null); //clear legislativeReference
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByName({ commit }, search) {
    legislativeReferenceService.findByName(search).then(
      (data) => {
        commit("SET_LEGISLATIVE_REFERENCES", data);
        commit("SET_LEGISLATIVE_REFERENCE", null); //clear legislativeReference
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    legislativeReferenceService.findById(id).then(
      (data) => {
        commit("SET_LEGISLATIVE_REFERENCE", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    legislativeReferenceService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical process saved!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/regulation");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    legislativeReferenceService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Regulation deleted!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/regulation");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    legislativeReferenceService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Regulation updated!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/regulation");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  legislativeReferences: (state) => {
    return state.legislativeReferences;
  },
  legislativeReference: (state) => {
    return state.legislativeReference;
  },
};

export const legislativeReference = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
