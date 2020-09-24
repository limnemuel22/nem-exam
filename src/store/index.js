import { createStore } from "vuex";

const state = {
  count: 0,
  users: [],
};

const mutations = {
  increment(state) {
    state.count++;
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
};

export default createStore({
  state,
  mutations,
});
