<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      layout: 'div',
    };
  },
};
</script>

<style>
/*body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>