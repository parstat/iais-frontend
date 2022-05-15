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
  findByName({ commit }, name) {
    dataStructureService.findByName(name).then(
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
    dataStructureService.findByNameAndType(formData).then(
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
    dataStructureService.findByType(type).then(
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
    return new Promise((resolve, reject) => {
      dataStructureService.update(formData).then(
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
      dataStructureService.addRecord(formData).then(
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
      dataStructureService.updateRecord(formData).then(
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
      dataStructureService
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
      dataStructureService.addComponent(formData).then(
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
      dataStructureService.updateComponent(formData).then(
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
      dataStructureService
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
