//import router from "@/router";
import { dataStructureService } from "@/services";
import router from "@/router";

const state = {
  dataStructures: [],
  dataStructure: null,
};

const mutations = {
  SET_DATASTRUCTURES(state, dataStructures) {
    state.dataStructures = dataStructures ? dataStructures : [];
  },
  SET_DATASTRUCTURE(state, dataStructure) {
    state.dataStructure = dataStructure;
  },
};

const actions = {
  findAll({ commit }) {
    dataStructureService.findAll().then(
      (data) => {
        commit("SET_DATASTRUCTURES", data);
        commit("SET_DATASTRUCTURE", null); //clear datastructure
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    dataStructureService.findById(id).then(
      (data) => {
        commit("SET_DATASTRUCTURE", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByName({ commit }, id) {
    dataStructureService.findByName(id).then(
      (data) => {
        commit("SET_DATASTRUCTURES", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    dataStructureService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Data Structure saved!", {
          root: true,
        });
        router.push("/metadata/structural/dataStructures/edit/" + data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    dataStructureService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Data Structure deleted!", {
          root: true,
        });
        router.push("/metadata/structural/dataStructures");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    dataStructureService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Data Structure updated!", {
          root: true,
        });
        router.push("/metadata/structural/dataStructures");
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

const getters = {
  dataStructures: (state) => {
    return state.dataStructures;
  },
  dataStructure: (state) => {
    return state.dataStructure;
  },
};

export const dataStructure = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
