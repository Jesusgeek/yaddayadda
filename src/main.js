import Vue from "vue";
import App from "./App.vue";
import router from './router';
//import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
// @import 'node_modules/bootstrap/scss/bootstrap';
// @import 'node_modules/bootstrap-vue/src/index.scss';
import './custom.scss'
import Types from "./assets/Types";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Install BootstrapVue and BootstrapVue icon components plugin
Vue.use(BootstrapVue)
Vue.use(IconsPlugin) // not yet used
Vue.use(Types)

Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
