//import router from "@/router";
import { unitDataStructureService } from "@/services";
import router from "@/router";

const state = {
  unitDataStructures: [],
  unitDataStructure: null,
};

const mutations = {
  SET_DATASTRUCTURES(state, unitDataStructures) {
    state.unitDataStructures = unitDataStructures ? unitDataStructures : [];
  },
  SET_DATASTRUCTURE(state, unitDataStructure) {
    state.unitDataStructure = unitDataStructure;
  },
};

const actions = {
  findAll({ commit }) {
    unitDataStructureService.findAll().then(
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
    unitDataStructureService.findById(id).then(
      (data) => {
        commit("SET_DATASTRUCTURE", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByName({ commit }, name) {
    unitDataStructureService.findByName(name).then(
      (data) => {
        commit("SET_DATASTRUCTURES", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByNameAndType({ commit }, formData) {
    unitDataStructureService.findByNameAndType(formData).then(
      (data) => {
        commit("SET_DATASTRUCTURES", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findByType({ commit }, type) {
    unitDataStructureService.findByType(type).then(
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
    unitDataStructureService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Data Structure saved!", {
          root: true,
        });
        router.push("/metadata/structural/unitDataStructures/edit/" + data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    unitDataStructureService.delete(id).then(
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
    return new Promise((resolve, reject) => {
      unitDataStructureService.update(formData).then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Data Structure updated!", {
            root: true,
          });
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  },
  addRecord({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      unitDataStructureService.addRecord(formData).then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Record added!", {
            root: true,
          });
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  },
  updateRecord({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      unitDataStructureService.updateRecord(formData).then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Record updated!", {
            root: true,
          });
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  },
  removeRecord({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      unitDataStructureService
        .removeRecord(data.dataStructureId, data.recordId)
        .then(
          (data) => {
            console.log(data);
            dispatch("message/success", "Record deleted!", {
              root: true,
            });
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
    });
  },
  addComponent({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      unitDataStructureService.addComponent(formData).then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Component added!", {
            root: true,
          });
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  },
  updateComponent({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      unitDataStructureService.updateComponent(formData).then(
        (data) => {
          console.log(data);
          dispatch("message/success", "Component updated!", {
            root: true,
          });
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  },
  removeComponent({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      unitDataStructureService
        .removeComponent(data.dataStructureId, data.componentId)
        .then(
          (data) => {
            console.log(data);
            dispatch("message/success", "Component deleted!", {
              root: true,
            });
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
    });
  },
};

const getters = {
  unitDataStructures: (state) => {
    return state.unitDataStructures;
  },
  unitDataStructure: (state) => {
    return state.unitDataStructure;
  },
};

export const unitDataStructure = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
