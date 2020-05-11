import { agentService } from "@/services";

const state = {
  agents: [],
  agent: null
};

const mutations = {
  SET_AGENTS(state, agents) {
    state.agents = agents;
  },
  SET_AGENT(state, agent) {
    state.agent = agent;
  }
};

const actions = {
  getAgents({ commit, getters, dispatch }) {
    agentService.getAll(getters.token).then(
      data => {
        commit("SET_AGENTS", data);
        commit("SET_AGENT", null); //clear statistical process
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  getAgentById({ commit, dispatch }, id) {
    agentService.getById(id).then(
      data => {
        commit("SET_AGENT", data);
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  saveAgent({ dispatch }, formData) {
    agentService.save(formData).then(
      data => {
        console.log(data);
        //dispatch("success", "Agent saved!");
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  deleteAgent({ dispatch }, id) {
    agentService.delete(id).then(
      data => {
        console.log(data);
        dispatch("success", "Agent deleted!");
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  },
  updateagent({ dispatch }, formData) {
    agentService.update(formData).then(
      data => {
        console.log(data);
        dispatch("success", "Agent updated!");
      },
      error => {
        dispatch("error", "[" + error.status + "] " + error.message);
        console.log(error);
      }
    );
  }
};

const getters = {
  agents: state => {
    return state.agents;
  },
  agent: state => {
    return state.agent;
  }
};

export const agent = {
  state,
  mutations,
  actions,
  getters
};
