<template>
  <div id="nav">
    <router-link to="/" exact>Home</router-link> ||
    <router-link to="/collectTyping">CollectTyping</router-link> ||
    <router-link to="/displayTapData">DisplayTapData</router-link> ||
    <router-link to="/awesomeTyping">AwesomeTyping</router-link>
  </div>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
};
</script>
HelloWorld

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20px;
}
</style>
