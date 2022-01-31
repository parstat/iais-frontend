import router from "@/router";
import { agentService } from "@/services";
import { Agent } from "@/common";
const state = {
  agents: [],
  agent: null,
  owners: [],
  maintainers: [],
  contacts: [],
  parents: [],
};

const mutations = {
  SET_AGENTS(state, agents) {
    state.agents = agents ? agents : [];
  },
  SET_AGENTS_BY_TYPE(state, agents) {
    for (let [key, value] of Object.entries(agents)) {
      switch (key) {
        case Agent.Individual:
          state.contacts = value;
          break;
        case Agent.Division:
          state.maintainers = value;
          state.parents = value ? value : [];
          break;
        case Agent.Organization:
          state.owners = value;
          state.parents = value ? value : [];
          break;
        default:
          break;
      }
    }
  },
  SET_AGENT(state, agent) {
    state.agent = agent;
  },
  RESET_PARENTS(state) {
    state.parents = []; //reset parents
  },
};

const actions = {
  findAll({ commit }) {
    agentService.findAll().then(
      (data) => {
        commit("SET_AGENTS", data);
        commit("SET_AGENT", null); //clear agent
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    agentService.findById(id).then(
      (data) => {
        commit("SET_AGENT", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByType({ commit }, type) {
    agentService.findByType(type).then(
      (data) => {
        const agents = {
          [type]: data,
        };
        commit("SET_AGENTS_BY_TYPE", agents);
        //important to not clear the agent (used for getting parents)
        //commit("SET_AGENT", null); //clear agent
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByNameAndType({ commit }, query) {
    agentService.findByNameAndType(query.name, query.type).then(
      (data) => {
        const agents = {
          [query.type]: data,
        };
        commit("SET_AGENTS_BY_TYPE", agents);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByName({ commit }, name) {
    agentService.findByName(name).then(
      (data) => {
        commit("SET_AGENTS", data);
        commit("SET_AGENT", null); //clear agent
      },
      (error) => {
        console.log(error);
      }
    );
  },

  clearParents({ commit }) {
    commit("RESET_PARENTS");
  },
  save({ dispatch }, formData) {
    agentService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Agent saved!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/agent");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    agentService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Agent deleted!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/agent");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    agentService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Agent updated!", {
          root: true,
        });
        router.push("/metadata/referential/gsim/agent");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  agents: (state) => {
    return state.agents;
  },
  agent: (state) => {
    return state.agent;
  },
  owners: (state) => {
    return state.owners;
  },
  maintainers: (state) => {
    return state.maintainers;
  },
  contacts: (state) => {
    return state.contacts;
  },
  parents: (state) => {
    return state.parents;
  },
};

export const agent = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
