import { valueDomainService } from "@/services";

const state = {
  substantiveValueDomains: [],
  sentinelValueDomains: [],
  sentinelValueDomain: null,
  substantiveValueDomain: null,
  valueDomains: [],
  valueDomain: null,
};

const mutations = {
  SET_VALUE_DOMAINS(state, valueDomains) {
    state.valueDomains = valueDomains ? valueDomains : [];
  },
  SET_SUBSTANTIVE_VALUE_DOMAINS(state, valueDomains) {
    state.substantiveValueDomains = valueDomains ? valueDomains : [];
  },
  SET_SENTINEL_VALUE_DOMAINS(state, valueDomains) {
    state.sentinelValueDomains = valueDomains ? valueDomains : [];
  },
  SET_SUBSTANTIVE_VALUE_DOMAIN(state, valueDomain) {
    state.substantiveValueDomain = valueDomain;
  },
  SET_SENTINEL_VALUE_DOMAIN(state, valueDomain) {
    state.sentinelValueDomains = valueDomain;
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
        if (data.scope === "SENTINEL") {
          commit("SET_SENTINEL_VALUE_DOMAIN", data);
        } else {
          commit("SET_SUBSTANTIVE_VALUE_DOMAIN", data);
        }
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

  findByName({ commit }, formData) {
    valueDomainService.findByName(formData.name, formData.scope).then(
      (data) => {
        if (!formData.scope) {
          commit("SET_VALUE_DOMAINS", data);
        } else {
          if (formData.scope === "SENTINEL") {
            commit("SET_SENTINEL_VALUE_DOMAINS", data);
          }
          if (formData.scope === "SUBSTANTIVE") {
            commit("SET_SUBSTANTIVE_VALUE_DOMAINS", data);
          }
        }
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
        dispatch("findById", data);
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
  substantiveValueDomains: (state) => {
    return state.substantiveValueDomains;
  },
  sentinelValueDomains: (state) => {
    return state.sentinelValueDomains;
  },
  substantiveValueDomain: (state) => {
    return state.substantiveValueDomain;
  },
  sentinelValueDomain: (state) => {
    return state.sentinelValueDomain;
  },
};

export const valueDomain = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
