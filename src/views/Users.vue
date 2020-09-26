<template>
  <div v-if="users.length <= 0">
    <i class="fa fa-gear fa-spin fa-5x loader"></i>
  </div>
  <div class="users" v-if="users.length > 0">
    <div class="container col-md-12 add-form" v-if="isFormShow">
      <h1 class="text-left">{{ action }} User</h1>
      <form>
        <div class="row text-left">
          <div class="form-group col-md-4">
            <label for="Name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="currentName"
              placeholder="Enter Name"
              required
            />
            <small class="text-danger" v-if="nameErrorMessage">{{
              nameErrorMessage
            }}</small>
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
            <small class="text-danger" v-if="emailErrorMessage">{{
              emailErrorMessage
            }}</small>
          </div>
          <div class="form-group col-md-4">
            <label for="exampleInputPassword1">Website</label>
            <input
              type="text"
              class="form-control"
              id="website"
              v-model="currentWebsite"
              placeholder="Enter Website"
              required
            />
            <small class="text-danger" v-if="websiteErrorMessage">{{
              websiteErrorMessage
            }}</small>
          </div>

          <div class="col-md-12">
            <button
              type="submit"
              class="btn btn-secondary pull-right"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-success mr-2 pull-right"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <br />

    <div class="col-md-12">
      <div
        class="p-3 mb-2 bg-success text-white text-left"
        v-if="successMessage"
      >
        User is Successfully {{ successMessage }}
      </div>
      <span class="pull-left ml-4"><h1>User List</h1></span>
      <div class="row pull-right mb-1 mr-3">
        <button
          type="submit"
          v-if="!isFormShow"
          class="btn btn-success"
          @click="addForm"
        >
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
      tableHeaders: ["Name", "Email", "Website", "Action"],
      action: "Add",
    };
  },
  setup() {
    const store = useStore();
    const users = computed(() => store.state.users);

    function createUsers(data) {
      store.commit("createUsers", data);
    }

    function addUser(name, email, website) {
      const data = { id: users.value.length + 1, name, email, website };
      axios.post(`https://jsonplaceholder.typicode.com/users`, data).then(
        ({ data }) => store.commit("addUser", data),
        (error) => console.log(error)
      );
    }

    function editUser(id, name, email, website) {
      axios
        .patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          name,
          email,
          website,
        })
        .then(
          ({ data }) => {
            console.log(data);
            const temp = users.value.map((q) => {
              if (id === q.id) {
                return {
                  ...q,
                  name: data.name,
                  email: data.email,
                  website: data.website,
                };
              } else {
                return q;
              }
            });
            console.log(temp);
            store.commit("editUser", temp);
          },
          (error) => console.log(error)
        );
    }

    function deleteUser(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(
        (res) => {
          console.log(res);
          const temp = users.value.filter((q) => q.id !== id);
          store.commit("deleteUser", temp);
        },
        (error) => console.log(error)
      );
    }

    return {
      createUsers,
      addUser,
      editUser,
      deleteUser,
      users,
    };
  },
  async mounted() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users?_limit=5"
    );
    this.createUsers(data);
  },
  methods: {
    addForm() {
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
      this.currentName === ""
        ? (this.nameErrorMessage = "Name is required!")
        : (this.nameErrorMessage = "");

      this.currentEmail === ""
        ? (this.emailErrorMessage = "Email is required!")
        : (this.emailErrorMessage = "");
      this.currentWebsite === ""
        ? (this.websiteErrorMessage = "Website is required!")
        : (this.websiteErrorMessage = "");

      if (
        this.currentName === "" ||
        this.currentEmail === "" ||
        this.currentWebsite === ""
      ) {
        return;
      }
      if (!this.currentId || this.currentId === "") {
        this.addUser(this.currentName, this.currentEmail, this.currentWebsite);

        this.successMessage = "Added!";
        setTimeout(() => {
          this.successMessage = "";
        }, 1000);
      } else {
        this.editUser(
          this.currentId,
          this.currentName,
          this.currentEmail,
          this.currentWebsite
        );
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
    UserList,
  },
};
</script>

<style scoped>
.users {
  margin-top: -2rem;
}
.add-form {
  padding: 1rem 1rem 1rem 1rem;
  max-width: 95%;
  border: solid #444242;
  border-radius: 7%;
}
.loader {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
