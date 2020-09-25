<template>
  <div class="container-fluid">
    <div class="container-fluid userlist">
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

      <!--  <div class="table-responsive">
      <table class="table table-fixed">
        <thead>
          <tr>
            <th scope="col" class="col-3">#</th>
            <th scope="col" class="col-3">First</th>
            <th scope="col" class="col-3">Last</th>
            <th scope="col" class="col-3">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="col-3">1</th>
            <td class="col-3">Mark</td>
            <td class="col-3">Otto</td>
            <td class="col-3">@mdo</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">2</th>
            <td class="col-3">Jacob</td>
            <td class="col-3">Thornton</td>
            <td class="col-3">@fat</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">3</th>
            <td colspan="2" class="col-6">Larry the Bird</td>
            <td class="col-3">@twitter</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">4</th>
            <td class="col-3">Martin</td>
            <td class="col-3">Williams</td>
            <td class="col-3">@Marty</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">5</th>
            <td colspan="2" class="col-3">Sam</td>
            <td colspan="2" class="col-3">Pascal</td>
            <td class="col-3">@sam</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">6</th>
            <td class="col-3">John</td>
            <td class="col-3">Green</td>
            <td class="col-3">@john</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">7</th>
            <td colspan="2" class="col-3">David</td>
            <td colspan="2" class="col-3">Bowie</td>
            <td class="col-3">@david</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">8</th>
            <td class="col-3">Pedro</td>
            <td class="col-3">Rodriguez</td>
            <td class="col-3">@rod</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">5</th>
            <td colspan="2" class="col-3">Sam</td>
            <td colspan="2" class="col-3">Pascal</td>
            <td class="col-3">@sam</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">10</th>
            <td class="col-3">Jacob</td>
            <td class="col-3">Thornton</td>
            <td class="col-3">@fat</td>
          </tr>
          <tr>
            <th scope="row" class="col-3">11</th>
            <td colspan="2" class="col-6">Larry the Bird</td>
            <td class="col-3">@twitter</td>
          </tr>
        </tbody>
      </table>
    </div> -->
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
.userlist {
  height: 35rem;
  overflow-y: scroll;
}
/* .table-fixed tbody {
  height: 300px;
  overflow-y: auto;
  width: 100%;
}

.table-fixed thead,
.table-fixed tbody,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
  display: block;
}

.table-fixed tbody td,
.table-fixed tbody th,
.table-fixed thead > tr > th {
  float: left;
  position: relative;
}

.table-fixed tbody td,
.table-fixed tbody th,
.table-fixed thead > tr > th > ::after {
  content: "";
  clear: both;
  display: block;
} */
</style>
