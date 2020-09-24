<template>
  <div class="container-fluid users">
    <div class="col-md-12 mb-5" v-if="isFormShow">
      <!-- <AddUser v-bind:currentUser="currentUser" /> -->
      <h1 class="text-left">{{ action }} new User</h1>
      <form>
        <div class="row text-left">
          <div class="form-group col-md-4">
            <label for="Name">Name</label>
            <input type="text" class="form-control" id="name" v-model="currentName" placeholder="Enter Name" required />
            <small class="text-danger" v-if="nameErrorMessage">{{ nameErrorMessage }}</small>
          </div>
          <div class="form-group col-md-4">
            <label for="exampleInputPassword1">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="currentEmail"
              placeholder="Enter Email"
              required
            />
            <small class="text-danger" v-if="emailErrorMessage">{{ emailErrorMessage }}</small>
          </div>
          <div class="form-group col-md-4">
            <label for="exampleInputPassword1">Website</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="currentWebsite"
              placeholder="Enter Website"
              required
            />
            <small class="text-danger" v-if="websiteErrorMessage">{{ websiteErrorMessage }}</small>
          </div>
        </div>
        <div class="row pull-right mr-3">
          <button type="submit" class="btn btn-primary mr-2" @click="submit">Submit</button>
          <button type="submit" class="btn btn-secondary" @click="cancel">Cancel</button>
        </div>
      </form>
    </div>
    <br />

    <div class="col-md-12">
      <div class="p-3 mb-2 bg-success text-white text-left" v-if="successMessage">
        User is Successfully {{ successMessage }}
      </div>
      <div class="row pull-right mb-1 mr-3">
        <button type="submit" v-if="!isFormShow" class="btn btn-success" @click="addForm">
          <i class="fa fa-plus"></i> Add User
        </button>
      </div>
      <UserList
        v-bind:users="users"
        v-bind:tableHeaders="tableHeaders"
        v-on:edit-user="onEditClick"
        v-on:delete-user="onDeleteClick"
      />
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
      nameErrorMessage: "",
      emailErrorMessage: "",
      websiteErrorMessage: "",
      successMessage: "",
      isFormShow: false,
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

    function addUser(name, email, website) {
      store.commit("addUser", { id: users.value.length + 1, name, email, website });
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
      addUser,
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
  },
  methods: {
    addForm() {
      console.log("add");
      this.isFormShow = true;
      this.currentName = "";
      this.currentEmail = "";
      this.currentWebsite = "";
      this.currentId = null;
    },
    onEditClick(id, name, email, website) {
      this.isFormShow = true;
      this.action = "Edit";
      this.currentId = id;
      this.currentName = name;
      this.currentEmail = email;
      this.currentWebsite = website;
    },
    onDeleteClick(id) {
      this.deleteUser(id);
      this.successMessage = "Deleted!";
      setTimeout(() => {
        this.successMessage = "";
      }, 1000);
    },
    cancel(e) {
      e.preventDefault();
      this.isFormShow = false;
    },
    submit(e) {
      e.preventDefault();
      this.currentName === "" ? (this.nameErrorMessage = "Name is required!") : (this.nameErrorMessage = "");

      this.currentEmail === "" ? (this.emailErrorMessage = "Email is required!") : (this.emailErrorMessage = "");
      this.currentWebsite === ""
        ? (this.websiteErrorMessage = "Website is required!")
        : (this.websiteErrorMessage = "");

      if (this.currentName === "" || this.currentEmail === "" || this.currentWebsite === "") {
        return;
      }
      if (!this.currentId || this.currentId === "") {
        this.addUser(this.currentName, this.currentEmail, this.currentWebsite);

        this.successMessage = "Added!";
        setTimeout(() => {
          this.successMessage = "";
        }, 1000);
      } else {
        this.editUser(this.currentId, this.currentName, this.currentEmail, this.currentWebsite);
        this.isEditing = false;
        this.currentName = "";
        this.currentEmail = "";
        this.currentWebsite = "";
        this.currentId = null;
        this.action = "Add";

        this.successMessage = "Updated!";
        setTimeout(() => {
          this.successMessage = "";
        }, 1000);
      }
      this.isFormShow = false;
    },
  },
  name: "Users",
  components: {
    // AddUser,
    UserList,
  },
};
</script>
