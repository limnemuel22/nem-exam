<template>
  <div class="header">
    <div class="nav nav-tabs container-fluid" id="nav-tab" role="tablist">
      <div class="row col-md-10">
        <router-link id="home" class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/todos">Todos</router-link>
        <router-link class="nav-link" to="/users">Users</router-link>
        <router-link class="nav-link" to="/photos">Photos</router-link>
      </div>
      <div class="col-md-2 logout">
        <button class="btn btn-dark text-right" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      const button = document.getElementById("home");
      setTimeout(() => {
        button.click();
      }, 500);
    },
  },
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
.logout {
  text-align: end;
  margin-left: 1rem;
  padding-right: 0px;
}
</style>
