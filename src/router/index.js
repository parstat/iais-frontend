import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import { Role } from "@/common";

import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Home from "@/views/Home";

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
    meta: { authorize: [] },
    children: [
      {
        path: "metadata",
        name: "Metadata",
        component: () => import("../views/metadata/Metadata"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential",
        name: "StatisticalProgramList",
        component: () =>
          import("../views/metadata/referential/StatisticalProgramList"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/edit/:id",
        name: "StatisticalProgramEdit",
        component: () =>
          import("../views/metadata/referential/StatisticalProgramEdit"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "metadata/referential/view/:id",
        name: "StatisticalProgramView",
        component: () =>
          import("../views/metadata/referential/StatisticalProgramView"),
        meta: { authorize: [Role.User] }
      },
      {
        path: "metadata/referential/delete/:id",
        name: "StatisticalProgramDelete",
        component: () =>
          import("../views/metadata/referential/StatisticalProgramDelete"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "metadata/referential/add",
        name: "StatisticalProgramAdd",
        component: () =>
          import("../views/metadata/referential/StatisticalProgramAdd"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/process",
        name: "Process",
        component: () => import("../views/metadata/process/BusinessProcesses"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/structural",
        name: "Structural",
        component: () => import("../views/metadata/structural/Datasets"),
        meta: { authorize: [] }
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
  const { authorize } = to.meta;
  const currentUser = store.getters.user;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      store.dispatch("error", "You are not authorized!");
      return next({ path: "/" });
    }
  }

  next();
});

export default router;
