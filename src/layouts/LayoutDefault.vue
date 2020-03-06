<template>
  <div class="LayoutDefault">
    <b-navbar toggleable="sm" type="light" variant="info">
      <b-navbar-brand href="#">YaddaYadda</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Dashboard</b-nav-item>
          <b-nav-item to="/ui">UI Designer</b-nav-item>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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