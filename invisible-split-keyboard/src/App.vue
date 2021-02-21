<template>
  <div id="nav">
    <router-link to="/" exact>Home</router-link>
    <label> || </label>
    <router-link to="/collectTyping">CollectTyping</router-link>
    <label> || </label>
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
  color: #2c3e50;
}

#nav {
  text-align: center;
  margin: 5px 0;
}
</style>
