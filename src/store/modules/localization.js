const state = {
  locale: localStorage.getItem("linguage") || process.env.VUE_APP_I18N_LOCALE,
};
const mutations = {
  SET_LOCALE(state, locale) {
    state.locale = locale;
    localStorage.setItem("language", locale);
  },
};

const actions = {
  setLocale({ commit }, locale) {
    commit("SET_LOCALE", locale);
  },
};

const getters = {
  locale: () => {
    return localStorage.getItem("language");
  },
};

export const localization = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
