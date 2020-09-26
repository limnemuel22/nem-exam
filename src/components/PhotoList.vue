<template>
  <div class=" photolist">
    <div class="thumbnail">
      <img v-bind:src="photo.url" class="image" v-bind:alt="photo.title" style="width:100%" />
      <div class="caption">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <a v-bind:href="photo.url">
                <p @click="test">{{ photo.title }}</p>
              </a>
            </div>
            <div class="col-md-4 buttons">
              <a class="edit" @click="$emit('edit-photo', photo.id, photo.title, photo.url, photo.thumbnailUrl)">
                Edit
              </a>
              <a class="delete" @click="$emit('delete-photo', photo.id)">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoList",
  props: ["photo"],
};
</script>

<style scoped>
.image {
  min-height: 22rem;
  max-height: 22rem;
}

.a:hover {
  color: #000000;
  cursor: pointer;
}
.edit:focus {
  color: rgb(81, 167, 207);
}
.delete:hover {
  color: #000000;
  cursor: pointer;
}
.a:focus {
  color: rgb(194, 49, 23);
}
</style>
