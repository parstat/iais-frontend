import { Context } from "@/common";

const state = {
  sidebarVisible: true,
  sidebarUnfoldable: false,
  context: "",
  isLoading: false,
  isReferential: false,
  isStructural: false,
  isProcess: false,
  isHome: true,
  breadcrumbs: [
    {
      path: "metadata",
      to: "/metadata",
    },
  ],
};

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebarVisible = !state.sidebarVisible;
  },
  TOGGLE_UNFOLDABLE(state) {
    state.sidebarUnfoldable = !state.sidebarUnfoldable;
  },
  UPDATE_SIDEBAR_VISIBLE(state, isVisible) {
    state.sidebarVisible = isVisible;
  },

  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_CONTEXT(state, context) {
    state.context = context;
    switch (context) {
      case Context.Home:
        state.isHome = true;
        break;
      case Context.Referential:
        state.isReferential = true;
        break;
      case Context.Structural:
        state.isStructural = true;
        break;
      case Context.Process:
        state.isProcess = true;
        break;
      default:
        break;
    }
  },
  CLEAR_CONTEXT(state) {
    state.context = "";
    state.isReferential = false;
    state.isProcess = false;
    state.isStructural = false;
    state.isHome = false;
  },
  CREATE_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
};

const actions = {
  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  toggleUnfoldable({ commit }) {
    commit("TOGGLE_UNFOLDABLE");
  },
  updateSidebarVisible({ commit }, payload) {
    commit("UPDATE_SIDEBAR_VISIBLE", payload.value);
  },
  loading({ commit }, payload) {
    commit("SET_LOADING", payload.value);
  },
  setContext({ commit }, context) {
    commit("CLEAR_CONTEXT");
    commit("SET_CONTEXT", context);
  },
  clearContext({ commit }) {
    commit("CLEAR_CONTEXT");
  },
  createBreadcrumbs({ commit }, route) {
    let pathArray = route.path.split("/");
    pathArray.shift();
    //console.log(route.params);
    if (Object.keys(route.params).length > 0) {
      //if route has a parameter remove it from array
      pathArray.pop();
    }
    let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
      var to = "/";
      if (idx > 0) {
        for (var i = 0; i < idx; i++) {
          to += breadcrumbArray[i].path + "/";
        }
      }
      to += path;
      //console.log(to);
      breadcrumbArray.push({
        path: path,
        to: to,
      });
      return breadcrumbArray;
    }, []);
    commit("CREATE_BREADCRUMBS", breadcrumbs);
  },
};

const getters = {
  sidebarVisible: (state) => {
    return state.sidebarVisible;
  },
  sidebarUnfoldable: (state) => {
    return state.sidebarUnfoldable;
  },
  sidebarMinimize: (state) => {
    return state.sidebarMinimize;
  },
  context: (state) => {
    return state.context;
  },
  isLoading: (state) => {
    return state.isLoading;
  },
  isHome: (state) => {
    return state.isHome;
  },
  isReferential: (state) => {
    return state.isReferential;
  },
  isStructural: (state) => {
    return state.isStructural;
  },
  isProcess: (state) => {
    return state.isProcess;
  },
  breadcrumbs: (state) => {
    return state.breadcrumbs;
  },
};

export const coreui = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
