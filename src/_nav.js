export default [
  {
    component: "CNavItem",
    name: "Home",
    to: "/",
    icon: "cil-speedometer",
    badge: {
      color: "primary",
      text: "NEW",
    },
  },
  {
    component: "CNavGroup",
    name: "Metadata",
    to: "/metadata",
    icon: "cil-puzzle",
    items: [
      {
        component: "CNavItem",
        name: "Referential",
        to: "/metadata/referential",
        icon: "cil-layers",
      },
      {
        component: "CNavItem",
        name: "Structural",
        to: "/metadata/structural",
        icon: "cil-layers",
      },
      {
        component: "CNavItem",
        name: "Process",
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
