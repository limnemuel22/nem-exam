<template>
  <div class="header">
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/todos">Todos</router-link>
      <router-link class="nav-link" to="/users">Users</router-link>
      <router-link class="nav-link" to="/photos">Photos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
