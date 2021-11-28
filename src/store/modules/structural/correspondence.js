import router from "@/router";
import { correspondenceService } from "@/services";

const state = {
  correspondences: [],
  correspondence: null
};

const mutations = {
  SET_CORRESPONDENCES(state, correspondences) {
    state.correspondences = correspondences ? correspondences : [];
  },
  SET_CORRESPONDENCE(state, correspondence) {
    state.correspondence = correspondence;
  }
};

const actions = {
  findAll({ commit }) {
    correspondenceService.findAll().then(
      data => {
        commit("SET_CORRESPONDENCES", data);
        commit("SET_CORRESPONDENCE", null);
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    correspondenceService.findById(id).then(
      data => {
        commit("SET_CORRESPONDENCE", data);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    correspondenceService.findByLocalId(localId).then(
      data => {
        commit("SET_CORRESPONDENCE", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    correspondenceService.findByName(name).then(
      data => {
        commit("SET_CORRESPONDENCES", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    correspondenceService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Correspondence saved!", {
          root: true
        });
        router.push("/metadata/structuralal/correspondence");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    correspondenceService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Correspondence deleted!", {
          root: true
        });
        router.push("/metadata/structuralal/correspondence");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    correspondenceService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Correspondence updated!", {
          root: true
        });
        router.push("/metadata/structuralal/correspondence");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  correspondences: state => {
    return state.correspondences;
  },
  correspondence: state => {
    return state.correspondence;
  }
};

export const correspondence = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
