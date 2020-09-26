import { createStore } from "vuex";

const state = {
  count: 0,
  users: [],
  todos: [],
  photos: [],
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
  createPhotos(state, payload) {
    state.photos = payload;
  },
  addPhoto(state, payload) {
    state.photos.push(payload);
  },
  editPhoto(state, payload) {
    state.photos = payload;
  },
  deletePhoto(state, payload) {
    state.photos = payload;
  },
};

export default createStore({
  state,
  mutations,
});
