import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Vuex from "vuex"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
// @import 'node_modules/bootstrap/scss/bootstrap';
// @import 'node_modules/bootstrap-vue/src/index.scss';
//import './custom.scss'
//import Types from "./assets/Types";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Install BootstrapVue and BootstrapVue icon components plugin
Vue.use(BootstrapVue)
Vue.use(IconsPlugin) // not yet used
Vue.use(Vuex)

Vue.config.productionTip = true;

const store = new Vuex.Store({ 

  // Initial state
  state: { 
    pages: [],
    page: {id:0, name:'No page selected', items:[]}
  },

  mutations: {
    //setUserPage(state, page) { state.currentPage = page },
    INITIALIZE_STORE(state) {
      // if (localStorage.getItem('vuex'))
      //   state.lsvx = localStorage.getItem('vuex')
      if (localStorage.pages)
        state.pages = JSON.parse(localStorage.pages)
    },

    SET_CURRENT_PAGE(state, payload) { state.page = payload.page },

    ADD_NEW_PAGE(state, {page}) { 
      state.pages.push(page)
      localStorage.pages = JSON.stringify(state.pages) // <- evtl eigene mutation dafür?
    },

  },

  getters: {
    currentPage: state => state.page,

  },

  actions: {
    //savePage({context, state}/*, otherParams*/) {  
    // ADD_NEW_PAGE(commit, page) {  
    //   this.pages.push(page)
    //   localStorage.pages = JSON.stringify(this.pages)
    //   //commit('SET_CURRENT_PAGE', {page})
    // },
  },

}) 

new Vue({
  render: h => h(App),
  store,
  router,
  
  beforeCreate() { this.$store.commit('INITIALIZE_STORE') },

}).$mount("#app");
