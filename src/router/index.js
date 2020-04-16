import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Home from "@/views/Home";

import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/",
    redirect: "/metadata",
    name: "Home",
    component: Home,
    children: [
      {
        path: "metadata",
        name: "Metadata",
        component: () => import("../views/metadata/Metadata")
      },
      {
        path: "metadata/referential",
        name: "StatisticalProcessList",
        component: () =>
          import("../views/metadata/referential/StatisticalProcessList")
      },
      {
        path: "metadata/referential/edit/:id",
        name: "StatisticalProcessEdit",
        component: () =>
          import("../views/metadata/referential/StatisticalProcessEdit")
      },
      {
        path: "metadata/referential/view/:id",
        name: "StatisticalProcessView",
        component: () =>
          import("../views/metadata/referential/StatisticalProcessView")
      },
      {
        path: "metadata/referential/delete/:id",
        name: "StatisticalProcessDelete",
        component: () =>
          import("../views/metadata/referential/StatisticalProcessDelete")
      },
      {
        path: "metadata/referential/add",
        name: "StatisticalProcessAdd",
        component: () =>
          import("../views/metadata/referential/StatisticalProcessAdd")
      },
      {
        path: "metadata/process",
        name: "Process",
        component: () => import("../views/metadata/process/BusinessProcesses")
      },
      {
        path: "metadata/structural",
        name: "Structural",
        component: () => import("../views/metadata/structural/Datasets")
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.isAuthenticated;

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
