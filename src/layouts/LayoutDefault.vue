<template>
  <div class="LayoutDefault">
    <b-navbar toggleable="sm" type="light" variant="info">
      <b-navbar-brand href="#">y</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
          
          <!-- Project / Page -->
          <!-- <b-nav-item-dropdown>
            <template v-slot:button-content>
              <strong>{{selectedPage ? selectedPage.name : "No page selected"}}</strong>
            </template>
            <b-dropdown-item v-b-modal.modal-new-page>New Page ...</b-dropdown-item>
            
            <b-dropdown-divider v-if="pages.length" />
            <b-dropdown-group v-if="pages.length">
              <b-dropdown-item-button v-for="page in pages" :key="page.id" 
                :value="page.id" @click="setPage(page)" :active="$store.selectedPage==page">{{page.name}}</b-dropdown-item-button>
            </b-dropdown-group>
          </b-nav-item-dropdown> -->

          <!-- Navigation -->
          <b-nav-item to="/">Dashboard</b-nav-item>
          <b-nav-item to="/ui">UI Designer</b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="modal-new-page" title="Create a new page" @ok="add_page_ok">
      <form ref="form" @submit.stop.prevent="add_page">
      <b-form-group :state="newPageNameState" label="Page description:" label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input id="name-input" v-model="newPageName" :state="newPageNameState" required />
      </b-form-group>
      </form>
    </b-modal>

    <!-- <nav class="nav">
      <router-link class="navlink" to="/">Dashboard</router-link>|
      <router-link class="navlink" to="/ui">UI Designer</router-link>
    </nav>-->
    <main class="LayoutDefault_main mt-5">
      <slot/>
    </main>
    <footer class="LayoutDefault_footer">
      <!--&copy; ...-->
    </footer>
  </div>
</template>


<script>
export default {

  data() { return { newPageName:'', newPageNameState: null, selectedPage: null } },
  //mounted() { this.loadPages() },

  methods: {

    // // Load stored pages
    // loadPages() {
    //   if (localStorage.pages) // + instance is Array check?
    //     this.pages = [ ...JSON.parse(localStorage.pages) ]

    //   console.log(this.pages)
    // },

    add_page_ok(e) { e.preventDefault(); this.add_page() },
    add_page() {

      // Check validity (new page name)
      this.newPageNameState = this.$refs.form.checkValidity()
      if (!this.newPageNameState)
        return

      // Add & select new page
      var lastId = this.pages.length == 0 ? 0 : Math.max.apply(Math,this.pages.map(o => o.id));
      var newPage = {id:lastId+1, name:this.newPageName, items:[]}
      // this.pages.push(newPage)
      // //this.$store.selectedPage = newPage
      // //this.$store.commit('SET_CURRENT_PAGE', {page:newPage})
      // this.setPage(newPage)

      this.addPage(newPage)
      this.setPage(newPage)

      // // Save new page & hide modal
      // localStorage.pages = JSON.stringify(this.pages)
      this.$nextTick(() => { this.$bvModal.hide('modal-new-page') })
    },

    addPage(page) { this.$store.commit('ADD_NEW_PAGE', {page}) },
    setPage(page) { this.$store.commit('SET_CURRENT_PAGE', {page}) },

  },

  computed: {
    pages() { return this.$store.pages||[] }
  },
  // // Provide the selected "user-page"
  // provide() { return {
  //   $pageProvider: { currentPage: () => this.selectedPage, savePage: () => this.savePage() }, 
  // }},

}
</script>


<style scoped>
.navlink {
  text-decoration: none;
  color: coral;
  font-weight: bold;
}
.nav {
  margin-bottom: 1em;
}
</style> 