import router from "@/router";
import { codeService } from "@/services";

const state = {
  codes: [],
  code: null,
};

const mutations = {
  SET_CODES(state, codes) {
    state.codes = codes ? codes : [];
  },
  SET_CODE(state, code) {
    state.code = code;
  },
};

const actions = {
  findAll({ commit }) {
    codeService.findAll().then(
      (data) => {
        commit("SET_CODES", data);
        commit("SET_CODE", null); //clear business function
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    codeService.findById(id).then(
      (data) => {
        commit("SET_CODE", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    codeService.findByLocalId(localId).then(
      (data) => {
        commit("SET_CODE", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    codeService.findByName(name).then(
      (data) => {
        commit("SET_CODES", data);
        //commit("SET_BUSINESS_FUNCTION", null); //clear business function
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    codeService.save(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code saved!", {
          root: true,
        });
        router.push("/metadata/structural/codelist/edit/" + data + "?step=2");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    codeService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code deleted!", {
          root: true,
        });
        router.push("/metadata/structural/codelist");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    codeService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addCodeItem({ dispatch }, formData) {
    codeService.addCodeItem(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code item added!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
        dispatch("message/error", "Code item could not be added!", {
          root: true,
        });
      }
    );
  },
  removeCodeItem({ dispatch }, codeDetails) {
    console.log(codeDetails);
    codeService.removeCodeItem(codeDetails).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code item removed!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  updateCodeItem({ dispatch }, formData) {
    codeService.addCodeItem(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code item updated!", {
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
  codes: (state) => {
    return state.codes;
  },
  code: (state) => {
    return state.code;
  },
};

export const code = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
