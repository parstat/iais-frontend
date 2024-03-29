import router from "@/router";
import { statisticalClassificationService } from "@/services";

const state = {
  statisticalClassifications: [],
  statisticalClassification: null
};

const mutations = {
  SET_STATISTICAL_CLASSIFICATIONS(state, statisticalClassifications) {
    state.statisticalClassifications = statisticalClassifications
      ? statisticalClassifications
      : [];
  },
  SET_STATISTICAL_CLASSIFICATION(state, statisticalClassification) {
    state.statisticalClassification = statisticalClassification;
  }
};

const actions = {
  findAll({ commit }) {
    statisticalClassificationService.findAll().then(
      data => {
        commit("SET_STATISTICAL_CLASSIFICATIONS", data);
        commit("SET_STATISTICAL_CLASSIFICATION", null);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    statisticalClassificationService.findById(id).then(
      data => {
        commit("SET_STATISTICAL_CLASSIFICATION", data);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    statisticalClassificationService.findByLocalId(localId).then(
      data => {
        commit("SET_STATISTICAL_CLASSIFICATION", data);
      },
      error => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    statisticalClassificationService.findByName(name).then(
      data => {
        commit("SET_STATISTICAL_CLASSIFICATIONS", data);
        commit("SET_STATISTICAL_CLASSIFICATION", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    statisticalClassificationService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical Classification saved!", {
          root: true
        });
        router.push("/metadata/structuralal/statisticalClassification");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    statisticalClassificationService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical Classification deleted!", {
          root: true
        });
        router.push("/metadata/structuralal/statisticalClassification");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    statisticalClassificationService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical Classification updated!", {
          root: true
        });
        router.push("/metadata/structuralal/statisticalClassification");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  statisticalClassifications: state => {
    return state.statisticalClassifications;
  },
  statisticalClassification: state => {
    return state.statisticalClassification;
  }
};

export const statisticalClassification = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
