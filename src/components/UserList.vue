<template>
  <div class="userlist">
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th v-for="header in tableHeaders" v-bind:key="header" scope="col">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.website }}</td>
          <td>
            <button class="btn btn-info mr-1" @click="() => editUser(user.id, user.name, user.email, user.website)">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger" @click="() => deleteUser(user.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: ["tableHeaders", "users"],
  methods: {
    editUser(id, name, email, website) {
      this.$emit("edit-user", id, name, email, website);
    },
    deleteUser(id) {
      this.$emit("delete-user", id);
    },
  },
};
</script>
