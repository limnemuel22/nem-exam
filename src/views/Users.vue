<template>
  <div class="users">
    <h1>This is an users page</h1>

    <!-- <ul id="example-1">
      <li v-for="item in users" :key="item.id">Sample: {{ item.email }}</li>
    </ul> -->

    <table border="1">
      <thead>
        <tr>
          <td>
            Name
          </td>
          <td>
            Email
          </td>
          <td>
            Action
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="() => showEdit(user.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <form v-if="isEditing">
      <input type="text" placeholder="Enter New Name" v-model="name" required />
      <button type="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      currentId: null,
      isEditing: false,
    };
  },
  setup() {
    const store = useStore();
    // const count = computed(() => store.state.count);
    const users = computed(() => store.state.users);

    function addUsers(data) {
      store.commit("addUsers", data);
    }

    function editUser(id, name) {
      const temp = users.value.map((q) => {
        console.log(id, name);
        if (id === q.id) {
          return {
            ...q,
            name,
          };
        } else {
          return q;
        }
      });

      store.commit("editUser", temp);
    }

    // function increment() {
    //   store.commit("increment");
    // }

    return {
      addUsers,
      editUser,
      users,
      // count,
      // increment,
    };
  },
  async mounted() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.addUsers(data);
    console.log(data);
  },
  methods: {
    showEdit(id) {
      this.isEditing = true;
      this.currentId = id;
    },
    submit(e) {
      e.preventDefault();
      console.log(this.name);
      this.editUser(this.currentId, this.name);
      this.isEditing = false;
      this.name = "";
    },
  },
  name: "Users",
  components: {},
};
</script>
