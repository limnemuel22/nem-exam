<template>
  <div v-if="todo.completed !== true" class="todo-item">
    <div class="row">
      <div class="col-md-10">
        <span class="todo-title" @click="$emit('edit-todo', { id: todo.id, from: 'incomplete' })">{{
          todo.title
        }}</span>
      </div>
      <div class="col-md-2">
        <button class="btn btn-danger del" @click="$emit('delete-todo', todo.id)"><i class="fa fa-times"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  action: "complete",
    };
  },
  name: "TodoItemIncomplete",
  props: ["todo"],
  methods: {},
};
</script>

<style scoped>
.todo-item {
  background-color: #ffffff;
  padding: 1rem;
  border-bottom: 0.2rem #ccc dotted;
  cursor: pointer;
}

.todo-item:hover {
  background-color: darkgrey;
}

.is-complete {
  text-decoration: line-through;
}

.todo-title:hover {
  color: #ffffff;
  text-decoration: underline;
}

.del {
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
