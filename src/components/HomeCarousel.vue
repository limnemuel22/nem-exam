<template>
  <div class="container ">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/todos.png" class="d-block w-100" alt="todos" />
        </div>
        <div class="carousel-item">
          <img src="../assets/users.png" class="d-block w-100" alt="users" />
        </div>
        <div class="carousel-item">
          <img src="../assets/photos.png" class="d-block w-100" alt="photos" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCarousel",
};
</script>

<style scoped>
h4 {
  color: #2c3e50;
}
</style>
