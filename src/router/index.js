import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import { Role } from "@/common";

import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Error from "@/views/error/Error";
import Unauthorized from "@/views/error/Unauthorized";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    meta: { authorize: [] }
  },
  {
    path: "/register",
    component: Register,
    meta: { authorize: [] }
  },
  {
    path: "/error",
    component: Error,
    meta: { authorize: [] }
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
    meta: { authorize: [] }
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
          import(
            "../views/metadata/referential/statisticalProgram/StatisticalProgramList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/add",
        name: "StatisticalProgramAdd",
        component: () =>
          import(
            "../views/metadata/referential/statisticalProgram/StatisticalProgramAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/edit/:id",
        name: "StatisticalProgramEdit",
        component: () =>
          import(
            "../views/metadata/referential/statisticalProgram/StatisticalProgramEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/view/:id",
        name: "StatisticalProgramView",
        component: () =>
          import(
            "../views/metadata/referential/statisticalProgram/StatisticalProgramView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/delete/:id",
        name: "StatisticalProgramDelete",
        component: () =>
          import(
            "../views/metadata/referential/statisticalProgram/StatisticalProgramDelete"
          ),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "metadata/referential/gsim",
        name: "ReferentialGsimConcepts",
        component: () => import("../views/metadata/referential/GsimConcepts"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/agent",
        name: "AgentList",
        component: () =>
          import("../views/metadata/referential/agent/AgentList"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/agent/add",
        name: "AgentAdd",
        component: () => import("../views/metadata/referential/agent/AgentAdd"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/agent/edit/:id",
        name: "AgentEdit",
        component: () =>
          import("../views/metadata/referential/agent/AgentEdit"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/agent/view/:id",
        name: "AgentView",
        component: () =>
          import("../views/metadata/referential/agent/AgentView"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/agent/delete/:id",
        name: "AgentDelete",
        component: () =>
          import("../views/metadata/referential/agent/AgentDelete"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/regulation",
        name: "LegislativeReferenceList",
        component: () =>
          import(
            "../views/metadata/referential/legislativeReference/LegislativeReferenceList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/regulation/add",
        name: "LegislativeReferenceAdd",
        component: () =>
          import(
            "../views/metadata/referential/legislativeReference/LegislativeReferenceAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/regulation/edit/:id",
        name: "LegislativeReferenceEdit",
        component: () =>
          import(
            "../views/metadata/referential/legislativeReference/LegislativeReferenceEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/regulation/view/:id",
        name: "LegislativeReferenceView",
        component: () =>
          import(
            "../views/metadata/referential/legislativeReference/LegislativeReferenceView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/regulation/delete/:id",
        name: "LegislativeReferenceDelete",
        component: () =>
          import(
            "../views/metadata/referential/legislativeReference/LegislativeReferenceDelete"
          ),
        meta: { authorize: [Role.Admin] }
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
  // redirect to unauthorized page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const userRole = store.getters["auth/role"];

  if (authorize.length) {
    if (!isAuthenticated || !authorize.includes(userRole)) {
      const err = {
        code: 401,
        message: "You cannot access this page!"
      };
      store.dispatch("error/unauthorized", err);
    }
  }

  next();
});

export default router;
