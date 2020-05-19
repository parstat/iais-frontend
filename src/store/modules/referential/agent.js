import { agentService } from "@/services";

const state = {
  agents: [],
  agent: null,
  agentsByType: {}
};

const mutations = {
  SET_AGENTS(state, agents) {
    state.agents = agents;
  },
  SET_AGENTS_BY_TYPE(state, agents) {
    for (let [key, value] of Object.entries(agents)) {
      state.agentsByType[key] = value;
    }
  },
  SET_AGENT(state, agent) {
    state.agent = agent;
  }
};

const actions = {
  findAll({ commit }) {
    agentService.findAll().then(
      data => {
        commit("SET_AGENTS", data);
        commit("SET_AGENT", null); //clear agent
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    agentService.findById(id).then(
      data => {
        commit("SET_AGENT", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  findByType({ commit }, type) {
    agentService.findByType(type).then(
      data => {
        const agents = {
          [type]: data
        };
        commit("SET_AGENTS_BY_TYPE", agents);
        commit("SET_AGENT", null); //clear agent
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    agentService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Statistical process saved!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    agentService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Agent deleted!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    agentService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Agent updated!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  agents: state => {
    return state.agents;
  },
  agentsByType: state => {
    return state.agentsByType;
  },
  agent: state => {
    return state.agent;
  }
};

export const agent = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
