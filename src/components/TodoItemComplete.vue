<template>
  <div v-if="todo.completed === true" class="todo-item">
    <div class="row">
      <div class="col-md-10">
        <span class="todo-title" @click="$emit('edit-todo', { id: todo.id, from: 'complete' })">{{ todo.title }}</span>
      </div>
      <div class="col-md-2">
        <button class="btn btn-success del"><i class="fa fa-check"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItemComplete",
  props: ["todo"],
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
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
