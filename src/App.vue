<template>
  <div class="app">
    <nav id="nav">
      <Header />
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  border: 1rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn-success {
  background-color: #3ebe84;
}
.btn-success:hover {
  background-color: #35bd80;
}
.btn-info {
  background-color: #5ec496;
}
.btn-info:hover {
  background-color: #42b983;
}
</style>
