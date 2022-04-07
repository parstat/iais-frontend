import router from "@/router";
import { codeListService } from "@/services";

const state = {
  codeLists: [],
  codeList: null,
};

const mutations = {
  SET_CODELISTS(state, codeLists) {
    state.codeLists = codeLists ? codeLists : [];
  },
  SET_CODELIST(state, codeList) {
    state.codeList = codeList;
  },
};

const actions = {
  findAll({ commit }) {
    codeListService.findAll().then(
      (data) => {
        commit("SET_CODELISTS", data);
        commit("SET_CODELIST", null); //clear business function
      },
      (error) => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    codeListService.findById(id).then(
      (data) => {
        commit("SET_CODELIST", data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByLocalId({ commit }, localId) {
    codeListService.findByLocalId(localId).then(
      (data) => {
        commit("SET_CODELIST", data);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  findByName({ commit }, name) {
    codeListService.findByName(name).then(
      (data) => {
        commit("SET_CODELISTS", data);
        //commit("SET_BUSINESS_FUNCTION", null); //clear business function
      },
      (error) => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    codeListService.save(formData).then(
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
    codeListService.delete(id).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code List deleted!", {
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
    codeListService.update(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code List updated!", {
          root: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  addCodeItem({ dispatch }, formData) {
    codeListService.addCodeItem(formData).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code item added!", {
          root: true,
        });
        dispatch("findById", data);
      },
      (error) => {
        console.log(error);
        dispatch("message/error", "Code item could not be added!", {
          root: true,
        });
      }
    );
  },
  removeCodeItem({ dispatch }, codeListDetails) {
    codeListService.removeCodeItem(codeListDetails).then(
      (data) => {
        console.log(data);
        dispatch("message/success", "Code item removed!", {
          root: true,
        });
        dispatch("findById", codeListDetails.codeListId);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  updateCodeItem({ dispatch }, formData) {
    codeListService.addCodeItem(formData).then(
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
  codeLists: (state) => {
    return state.codeLists;
  },
  codeList: (state) => {
    return state.codeList;
  },
};

export const codeList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
