import i18n from "./i18n";

export default [
  {
    component: "CNavItem",
    name: i18n.global.t("common.home"),
    to: "/",
    icon: "cil-speedometer",
    badge: {
      color: "primary",
      text: "NEW",
    },
  },
  {
    component: "CNavGroup",
    name: i18n.global.t("common.metadata"), //it is working but does not reaload
    to: "/metadata",
    icon: "cil-puzzle",
    items: [
      {
        component: "CNavItem",
        name: i18n.global.t("common.referential"),
        to: "/metadata/referential",
        icon: "cil-layers",
      },
      {
        component: "CNavItem",
        name: i18n.global.t("common.structural"),
        to: "/metadata/structural",
        icon: "cil-layers",
      },
      {
        component: "CNavItem",
        name: i18n.global.t("common.process"),
        to: "/metadata/process",
        icon: "cil-layers",
      },
    ],
  },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
];
