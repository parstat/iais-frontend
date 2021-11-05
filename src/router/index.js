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
        path: "metadata/referential/documentation/add",
        name: "ProcessDocumentationAdd",
        component: () =>
          import(
            "../views/metadata/referential/processDocumentation/ProcessDocumentationAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/documentation/view/:id",
        name: "ProcessDocumentationView",
        component: () =>
          import(
            "../views/metadata/referential/processDocumentation/ProcessDocumentationView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/documentation/edit/:id",
        name: "ProcessDocumentationEdit",
        component: () =>
          import(
            "../views/metadata/referential/processDocumentation/edit/ProcessDocumentationEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
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
        path: "metadata/referential/gsim/standard",
        name: "StatisticalStandardList",
        component: () =>
          import(
            "../views/metadata/referential/statisticalStandard/StatisticalStandardList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/standard/add",
        name: "StatisticalStandardAdd",
        component: () =>
          import(
            "../views/metadata/referential/statisticalStandard/StatisticalStandardAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/standard/edit/:id",
        name: "StatisticalStandardEdit",
        component: () =>
          import(
            "../views/metadata/referential/statisticalStandard/StatisticalStandardEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/standard/view/:id",
        name: "StatisticalStandardView",
        component: () =>
          import(
            "../views/metadata/referential/statisticalStandard/StatisticalStandardView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/standard/delete/:id",
        name: "StatisticalStandardDelete",
        component: () =>
          import(
            "../views/metadata/referential/statisticalStandard/StatisticalStandardDelete"
          ),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/function",
        name: "BusinessFunctionList",
        component: () =>
          import(
            "../views/metadata/referential/businessFunction/BusinessFunctionList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/function/add",
        name: "BusinessFunctionAdd",
        component: () =>
          import(
            "../views/metadata/referential/businessFunction/BusinessFunctionAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/function/edit/:id",
        name: "BusinessFunctionEdit",
        component: () =>
          import(
            "../views/metadata/referential/businessFunction/BusinessFunctionEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/function/view/:id",
        name: "BusinessFunctionView",
        component: () =>
          import(
            "../views/metadata/referential/businessFunction/BusinessFunctionView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/function/delete/:id",
        name: "BusinessFunctionDelete",
        component: () =>
          import(
            "../views/metadata/referential/businessFunction/BusinessFunctionDelete"
          ),
        meta: { authorize: [Role.Admin] }
      },

      {
        path: "metadata/referential/gsim/service",
        name: "BusinessServiceList",
        component: () =>
          import(
            "../views/metadata/referential/businessService/BusinessServiceList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/service/add",
        name: "BusinessServiceAdd",
        component: () =>
          import(
            "../views/metadata/referential/businessService/BusinessServiceAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/service/edit/:id",
        name: "BusinessServiceEdit",
        component: () =>
          import(
            "../views/metadata/referential/businessService/BusinessServiceEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/service/view/:id",
        name: "BusinessServiceView",
        component: () =>
          import(
            "../views/metadata/referential/businessService/BusinessServiceView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/service/delete/:id",
        name: "BusinessServiceDelete",
        component: () =>
          import(
            "../views/metadata/referential/businessService/BusinessServiceDelete"
          ),
        meta: { authorize: [Role.Admin] }
      },

      {
        path: "metadata/referential/gsim/method",
        name: "ProcessMethodList",
        component: () =>
          import(
            "../views/metadata/referential/processMethod/ProcessMethodList"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/method/add",
        name: "ProcessMethodAdd",
        component: () =>
          import(
            "../views/metadata/referential/processMethod/ProcessMethodAdd"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/method/edit/:id",
        name: "ProcessMethodEdit",
        component: () =>
          import(
            "../views/metadata/referential/processMethod/ProcessMethodEdit"
          ),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/referential/gsim/method/view/:id",
        name: "ProcessMethodView",
        component: () =>
          import(
            "../views/metadata/referential/processMethod/ProcessMethodView"
          ),
        meta: { authorize: [] }
      },
      {
        path: "metadata/referential/gsim/method/delete/:id",
        name: "ProcessMethodDelete",
        component: () =>
          import(
            "../views/metadata/referential/processMethod/ProcessMethodDelete"
          ),
        meta: { authorize: [Role.Admin] }
      },

      {
        path: "metadata/process",
        name: "Process",
        component: () => import("../views/metadata/process/BusinessProcesses"),
        meta: { authorize: [] }
      },
      // Structural
      {
        path: "metadata/structural",
        name: "StructuralComponents",
        component: () =>
          import("../views/metadata/structural/StructuralComponents"),
        meta: { authorize: [] }
      },
      /* Variable */
      {
        path: "metadata/structural/variable/",
        name: "StructuralVariableList",
        //component: () => import("../views/metadata/structural/Datasets"),
        component: () =>
          import("../views/metadata/structural/variable/VariableList"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/structural/variable/add",
        name: "VariableAdd",
        component: () =>
          import("../views/metadata/structural/variable/VariableAdd"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/structural/variable/view/:id",
        name: "VariableView",
        component: () =>
          import("../views/metadata/structural/variable/VariableView"),
        meta: { authorize: [] }
      },
      {
        path: "metadata/structural/variable/edit/:id",
        name: "VariableEdit",
        component: () =>
          import("../views/metadata/structural/variable/VariableEdit"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      {
        path: "metadata/structural/variable/delete/:id",
        name: "VariableDelete",
        component: () =>
          import("../views/metadata/structural/variable/VariableDelete"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      //* Variable Representations View*/
      {
        path: "metadata/structural/variable/Representation/view/:id",
        name: "VariableRepresentationsView",
        component: () =>
          import(
            "../views/metadata/structural/variableRepresentations/VariableRepresentationsView"
          ),
        meta: { authorize: [] }
      },
      //* Statistical Classifications */
      {
        path: "metadata/structural/statisticalClassifications/",
        name: "StructuralStatisticalClassificationsList",
        component: () =>
          import(
            "../views/metadata/structural/statisticalClassifications/StatisticalClassificationsList"
          ),
        meta: { authorize: [] }
      },
      //Statistical Classifications View
      {
        path: "metadata/structural/statisticalClassifications/view/:id",
        name: "StatisticalClassificationsView",
        component: () =>
          import(
            "../views/metadata/structural/statisticalClassifications/StatisticalClassificationsView"
          ),
        meta: { authorize: [] }
      },
      //* Code List */
      {
        path: "metadata/structural/code/",
        name: "StructuralCodeList",
        component: () =>
          import("../views/metadata/structural/codeList/CodeList"),
        meta: { authorize: [] }
      },
      //Code Add
      {
        path: "metadata/structural/code/add",
        name: "CodeAdd",
        component: () =>
          import("../views/metadata/structural/codeList/CodeAdd"),
        meta: { authorize: [Role.User, Role.Admin] }
      },
      //Code View
      {
        path: "metadata/structural/code/view/:id",
        name: "CodeView",
        component: () =>
          import("../views/metadata/structural/codeList/CodeView"),
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
