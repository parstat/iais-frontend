const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  breadcrumbs: [
    {
      path: "metadata",
      to: "/metadata"
    }
  ],
  backButton: {
    show: false,
    url: "/"
  }
};

const mutations = {
  TOGGLE_SIDEBAR_DESKTOP(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  TOGGLE_SIDEBAR_MOBILE(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  CREATE_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
  SET_BACK_BUTTON(state, backButton) {
    state.backButton = backButton;
  },
  set(state, [variable, value]) {
    state[variable] = value;
  }
};

const actions = {
  toggleSidebarDesktop({ commit }) {
    commit("TOGGLE_SIDEBAR_DESKTOP");
  },

  toggleSidebarMobile({ commit }) {
    commit("TOGGLE_SIDEBAR_MOBILE");
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
      breadcrumbArray.push({
        path: path,
        to: breadcrumbArray[idx - 1]
          ? "/" + breadcrumbArray[idx - 1].path + "/" + path
          : "/" + path
      });
      return breadcrumbArray;
    }, []);
    commit("CREATE_BREADCRUMBS", breadcrumbs);
  },

  setBackButton({ commit }, { currentRoute, destinationRoute }) {
    let backButton = {};
    var pathArray = destinationRoute.path.split("/");
    //console.log(destinationRoute.params);
    if (Object.keys(destinationRoute.params).length > 0) {
      //if route has a parameter remove it from array
      pathArray.pop();
    }
    var parentPath = "";
    for (let i = 0; i < pathArray.length - 1; i++) {
      parentPath += pathArray[i] + "/";
    }

    backButton.show = currentRoute.name != "Metadata";
    backButton.url = parentPath == "/" ? "/" : parentPath.slice(0, -1);

    commit("SET_BACK_BUTTON", backButton);
  }
};

const getters = {
  sidebarShow: state => {
    return state.sidebarShow;
  },
  sidebarMinimize: state => {
    return state.sidebarMinimize;
  },
  breadcrumbs: state => {
    return state.breadcrumbs;
  },
  backButton: state => {
    return state.backButton;
  }
};

export const coreui = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
