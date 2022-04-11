import router from "@/router";
import { statisticalClassificationService } from "@/services";

const state = {
  statisticalClassifications: [],
  statisticalClassification: null,
  flatStatisticalClassification: null,
};

const mutations = {
  SET_STATISTICAL_CLASSIFICATIONS(state, statisticalClassifications) {
    state.statisticalClassifications = statisticalClassifications
      ? statisticalClassifications
      : [];
  },
  SET_STATISTICAL_CLASSIFICATION(state, statisticalClassification) {
    state.statisticalClassification = statisticalClassification;
  },
  SET_FLAT_STATISTICAL_CLASSIFICATION(state, flatStatisticalClassification) {
    state.flatStatisticalClassification = flatStatisticalClassification;
  },
};

const actions = {
  findAll({ commit }) {
    statisticalClassificationService.findAll().then(
      (data) => {
        commit("SET_STATISTICAL_CLASSIFICATIONS", data);
        commit("SET_STATISTICAL_CLASSIFICATION", null);
        commit("SET_FLAT_STATISTICAL_CLASSIFICATION", null);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    statisticalClassificationService.findById(id).then(
      (data) => {
        commit("SET_STATISTICAL_CLASSIFICATION", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    statisticalClassificationService.findByLocalId(localId).then(
      (data) => {
        commit("SET_STATISTICAL_CLASSIFICATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findFlatById({ commit }, id) {
    statisticalClassificationService.findFlatById(id).then(
      (data) => {
        commit("SET_FLAT_STATISTICAL_CLASSIFICATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    statisticalClassificationService.findByName(name).then(
      (data) => {
        commit("SET_STATISTICAL_CLASSIFICATIONS", data);
        commit("SET_STATISTICAL_CLASSIFICATION", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    statisticalClassificationService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical Classification saved!", {
          root: true,
        });
        router.push(
          "/metadata/structural/classifications/edit/" + data + "?step=2"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },

  addLevel({ dispatch }, formData) {
    statisticalClassificationService.addLevel(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Level added!", {
          root: true,
        });
        dispatch("findById", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  updateLevel({ dispatch }, formData) {
    statisticalClassificationService.updateLevel(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Level updated!", {
          root: true,
        });
        dispatch("findById", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  removeLevel({ dispatch }, formData) {
    statisticalClassificationService
      .removeLevel(formData.statisticalClassificationId, formData.levelId)
      .then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Level removed!", {
            root: true,
          });
          dispatch("findById", formData.statisticalClassificationId);
        },
        (error) => {
          console.log(error);
        }
      );
  },

  delete({ dispatch }, id) {
    statisticalClassificationService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical Classification deleted!", {
          root: true,
        });
        router.push("/metadata/structural/classifications");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    statisticalClassificationService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Statistical Classification updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  uploadItems({ dispatch }, formData) {
    statisticalClassificationService.uploadItems(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Items uploaded!", {
          root: true,
        });
        dispatch("findById", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  statisticalClassifications: (state) => {
    return state.statisticalClassifications;
  },
  statisticalClassification: (state) => {
    return state.statisticalClassification;
  },
  flatStatisticalClassification: (state) => {
    return state.flatStatisticalClassification;
  },
};

export const statisticalClassification = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
