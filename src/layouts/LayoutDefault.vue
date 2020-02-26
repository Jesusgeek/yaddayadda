<template>
  <div class="LayoutDefault">
    <nav class="nav">
      <router-link class="navlink" to="/">Dashboard</router-link> |
      <router-link class="navlink" to="/ui">UI Designer</router-link>
    </nav>
    <main class="LayoutDefault_main">
      <slot/>
    </main>
    <footer class="LayoutDefault_footer">
      <!--&copy; ...-->
    </footer>
  </div>
</template>

<style scoped>
  .navlink { text-decoration:none; color:coral; font-weight:bold; }
  .nav { margin-bottom:1em; }
</style> 