<template>
  <div class="container-fluid users">
    <div class="row">
      <div class="col-md-8">
        <UserList
          v-bind:users="users"
          v-bind:tableHeaders="tableHeaders"
          v-on:edit-user="onEditClick"
          v-on:delete-user="onDeleteClick"
        />
      </div>
      <div class="col-md-4 text-left">
        <!-- <AddUser v-bind:currentUser="currentUser" /> -->
        <h1>{{ action }} new User</h1>
        <form>
          <div class="form-group">
            <label for="Name">Name</label>
            <input type="text" class="form-control" id="name" v-model="currentName" placeholder="Enter Name" required />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="currentEmail"
              placeholder="Enter Email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Website</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="currentWebsite"
              placeholder="Enter Website"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary mr-2" @click="submit">Submit</button>
          <button type="submit" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
//import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

export default {
  data() {
    return {
      currentId: null,
      currentName: "",
      currentEmail: "",
      currentWebsite: "",
      isEditing: false,
      //  currentUser: [],
      tableHeaders: ["Name", "Email", "Website", "Action"],
      action: "Add",
    };
  },
  setup() {
    const store = useStore();
    // const count = computed(() => store.state.count);
    const users = computed(() => store.state.users);

    function createUsers(data) {
      store.commit("createUsers", data);
    }

    function editUser(id, name, email, website) {
      const temp = users.value.map((q) => {
        if (id === q.id) {
          return {
            ...q,
            name,
            email,
            website,
          };
        } else {
          return q;
        }
      });

      store.commit("editUser", temp);
    }

    function deleteUser(id) {
      const temp = users.value.filter((q) => {
        return q.id !== id;
      });

      store.commit("deleteUser", temp);
    }

    // function increment() {
    //   store.commit("increment");
    // }

    return {
      createUsers,
      editUser,
      deleteUser,
      users,
      // count,
      // increment,
    };
  },
  async mounted() {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.createUsers(data);
    console.log(data);
  },
  methods: {
    onEditClick(id, name, email, website) {
      this.isEditing = true;
      this.action = "Edit";
      this.currentId = id;
      this.currentName = name;
      this.currentEmail = email;
      this.currentWebsite = website;
    },
    onDeleteClick(id) {
      this.isEditing = true;
      this.action = "Edit";
      this.currentId = id;
      this.deleteUser(id);
    },
    submit(e) {
      e.preventDefault();
      this.editUser(this.currentId, this.currentName, this.currentEmail, this.currentWebsite);
      this.isEditing = false;
      this.currentName = "";
      this.currentEmail = "";
      this.currentWebsite = "";
      this.action = "Add";
    },
  },
  name: "Users",
  components: {
    // AddUser,
    UserList,
  },
};
</script>
