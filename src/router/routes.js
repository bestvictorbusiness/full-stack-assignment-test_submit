const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("src/pages/dashboard/IndexPage.vue"),
      },
      {
        path: "company",
        component: () => import("pages/company/company-list.vue"),
      },
      {
        path: "company-form",
        component: () => import("pages/company/company-form.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
