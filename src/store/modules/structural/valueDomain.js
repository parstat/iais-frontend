import { valueDomainService } from "@/services";

const state = {
  valueDomains: [],
  valueDomain: null,
};

const mutations = {
  SET_VALUE_DOMAINS(state, valueDomains) {
    state.valueDomains = valueDomains ? valueDomains : [];
  },
  SET_VALUE_DOMAIN(state, valueDomain) {
    state.valueDomain = valueDomain;
  },
};

const actions = {
  findAll({ commit }) {
    valueDomainService.findAll().then(
      (data) => {
        commit("SET_VALUE_DOMAINS", data);
        commit("SET_VALUE_DOMAIN", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    valueDomainService.findById(id).then(
      (data) => {
        commit("SET_VALUE_DOMAIN", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    valueDomainService.findByLocalId(localId).then(
      (data) => {
        commit("SET_VALUE_DOMAIN", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    valueDomainService.findByName(name).then(
      (data) => {
        commit("SET_VALUE_DOMAINS", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    valueDomainService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Value domain saved!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    valueDomainService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Value domain deleted!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    valueDomainService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Value domain updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  valueDomains: (state) => {
    return state.valueDomains;
  },
  valueDomain: (state) => {
    return state.valueDomain;
  },
};

export const valueDomain = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
