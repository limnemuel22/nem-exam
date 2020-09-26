<template>
  <div class="container-fluid">
    <div class="tableFixHead">
      <table class="table table-hover table-striped">
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
              <button
                class="btn btn-info mr-1 mt-1"
                @click="() => editUser(user.id, user.name, user.email, user.website)"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-danger mr-1 mt-1" @click="() => deleteUser(user.id)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

<style scoped>
.tableFixHead {
  overflow-y: auto;
  height: 32rem;
  width: 100%;
  border-radius: 0.5rem;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
}

table {
  width: 100%;
}
th,
td {
  padding: 8px 16px;
}
th {
  background: #eee;
}

.tableFixHead,
.tableFixHead td {
  /*  box-shadow: inset 1px -1px #000; */
}
.tableFixHead th {
  /*  box-shadow: inset 1px 1px #000, 0 1px #000; */
}
</style>
