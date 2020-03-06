import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/pages/Dashboard";
import CreateUI from "@/pages/CreateUI";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: CreateUI // Dashboard // temp UI also as starting page
    },
    {
      path: "/ui",
      name: "UI Design",
      component: CreateUI
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   if (!isAuthenticated) next('/login')
//   else next()
// })
