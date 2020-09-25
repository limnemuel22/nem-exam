<template>
  <div v-if="todos.length <= 0">
    <i class="fa fa-gear fa-spin fa-5x loader"></i>
  </div>
  <div class="container todos" v-if="todos.length > 0">
    <div class="p-3 mb-2 bg-success text-white text-left" v-if="successMessage">
      User is Successfully {{ successMessage }}
    </div>
    <h1 class="text-left">Todo</h1>
    <div class="card-deck">
      <div class="card">
        <img src="" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">Add Todos</h5>
          <hr />
          <form>
            <div class="row text-left">
              <div class="form-group col-md-12">
                <label for="Todo">Todo</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="title"
                  placeholder="Enter Todo Title"
                  required
                />
                <small class="text-danger" v-if="titleErrorMessage">{{ titleErrorMessage }}</small>
              </div>

              <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-success mr-2" @click="submit">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card">
        <img src="" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">Todo List</h5>
          <hr />
          <div class="col-md-12 incomplete">
            <div v-bind:key="todo.id" v-for="todo in todos">
              <div v-if="isLoadingIncomplete">
                <i class="fa fa-gear fa-spin fa-3x todos-loader"></i>
              </div>
              <TodoItemIncomplete
                v-if="!isLoadingIncomplete"
                v-bind:todo="todo"
                v-on:edit-todo="onEditClick"
                v-on:delete-todo="onDeleteClick"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <img src="" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">Done Todo</h5>
          <hr />
          <div class="col-md-12 complete">
            <div v-bind:key="todo.id" v-for="todo in todos">
              <div v-if="isLoadingComplete">
                <i class="fa fa-gear fa-spin fa-3x todos-loader"></i>
              </div>
              <TodoItemComplete v-if="!isLoadingComplete" v-bind:todo="todo" v-on:edit-todo="onEditClick" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import TodoItemIncomplete from "../components/TodoItemIncomplete";
import TodoItemComplete from "../components/TodoItemComplete";
export default {
  data() {
    return {
      title: "",
      titleErrorMessage: "",
      isLoadingIncomplete: false,
      isLoadingComplete: false,
    };
  },
  name: "Todos",
  components: {
    TodoItemIncomplete,
    TodoItemComplete,
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.state.todos);

    function createTodos(data) {
      store.commit("createTodos", data);
    }

    function addTodo(newTodo) {
      this.isLoadingIncomplete = true;
      axios.post(`https://jsonplaceholder.typicode.com/todos`, newTodo).then(
        ({ data }) => {
          if (this.todos.map((e) => e.id).includes(data.id)) {
            const newId = data.id + 1;
            store.commit("addTodo", { ...data, id: newId });
          } else {
            store.commit("addTodo", data);
          }
          this.isLoadingIncomplete = false;
        },
        (error) => {
          console.log(error);
          this.isLoadingIncomplete = false;
        }
      );
    }

    function editTodo(id, completed, from) {
      from === "complete" ? (this.isLoadingIncomplete = true) : (this.isLoadingComplete = true);
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { completed: !completed }).then(
        ({ data }) => {
          const temp = todos.value.map((q) => {
            if (q.id === id) {
              q.completed = data.completed;
            } else {
              q;
            }
            return q;
          });
          store.commit("editUser", temp);
          this.isLoadingIncomplete = false;
          this.isLoadingComplete = false;
        },
        (error) => {
          console.log(error);
          this.isLoadingIncomplete = false;
          this.isLoadingComplete = false;
        }
      );
    }

    function deleteTodo(id) {
      this.isLoadingIncomplete = true;
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
        (res) => {
          console.log(res);
          const temp = todos.value.filter((q) => q.id !== id);
          store.commit("deleteTodo", temp);
          this.isLoadingIncomplete = false;
        },
        (error) => {
          console.log(error);
          this.isLoadingIncomplete = false;
        }
      );
    }

    return {
      createTodos,
      addTodo,
      editTodo,
      deleteTodo,
      todos,
    };
  },
  async mounted() {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    this.createTodos(data);
  },

  methods: {
    async onEditClick(event) {
      console.log(event);
      const completed = await this.todos.filter((e) => e.id === event.id);
      this.editTodo(event.id, completed[0].completed, event.from);
      this.successMessage = "Updated!";
      setTimeout(() => {
        this.successMessage = "";
        event.from = "";
      }, 1000);
    },

    onDeleteClick(id) {
      this.deleteTodo(id);
      this.successMessage = "Deleted!";
      setTimeout(() => {
        this.successMessage = "";
      }, 1000);
    },
    submit(e) {
      if (!this.title || this.title === "") {
        this.titleErrorMessage = "Title is required!";
        return;
      }
      e.preventDefault();
      const newTodo = {
        title: this.title,
        completed: false,
      };
      this.addTodo(newTodo);
      this.successMessage = "Added!";

      setTimeout(() => {
        this.successMessage = "";
      }, 1000);
    },
  },
};
</script>

<style scoped>
.btn-circle {
  border: none;
  color: black;
  background-color: #ffffff;
}
.complete {
  height: 35rem;
  overflow-y: scroll;
}
.incomplete {
  height: 35rem;
  overflow-y: scroll;
}
.loader {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.todos-loader {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.card {
  border-radius: 7%;
  border: solid #444242;
}
</style>
