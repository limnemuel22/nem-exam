import { createStore } from "vuex";

const state = {
  count: 0,
  users: [],
  todos: [],
};

const mutations = {
  increment(state) {
    state.count++;
  },
  addUser(state, payload) {
    state.users.push(payload);
  },
  createUsers(state, payload) {
    state.users = payload;
  },
  editUser(state, payload) {
    state.users = payload;
  },
  deleteUser(state, payload) {
    state.users = payload;
  },
  createTodos(state, payload) {
    state.todos = payload;
  },
  addTodo(state, payload) {
    state.todos.push(payload);
  },
  deleteTodo(state, payload) {
    state.todos = payload;
  },
};

export default createStore({
  state,
  mutations,
});
