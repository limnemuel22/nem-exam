<template>
  <div v-if="photos.length <= 0 || isLoading">
    <i class="fa fa-gear fa-spin fa-5x loader"></i>
  </div>
  <div class="container photos" v-if="photos.length > 0">
    <div class="col-md-12 add-form" v-if="isFormShow">
      <h1 class="text-left">{{ action }} Photo</h1>
      <form>
        <div class="row text-left">
          <div class="form-group col-md-4">
            <label for="Title">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="currentTitle"
              placeholder="Enter Title"
              required
            />
            <small class="text-danger" v-if="titleErrorMessage">{{
              titleErrorMessage
            }}</small>
          </div>
          <div class="form-group col-md-4">
            <label for="Url">Url</label>
            <input
              type="url"
              class="form-control"
              id="url"
              v-model="currentUrl"
              placeholder="Enter Url"
              required
            />
            <small class="text-danger" v-if="urlErrorMessage">{{
              urlErrorMessage
            }}</small>
          </div>
          <div class="form-group col-md-4">
            <label for="Thumbnail">Thumbnail</label>
            <input
              type="url"
              class="form-control"
              id="thumbnail"
              v-model="currentThumbnail"
              placeholder="Enter Thumbnail"
              required
            />
            <small class="text-danger" v-if="thumbnailErrorMessage">{{
              thumbnailErrorMessage
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
    <div class="p-3 mb-2 bg-success text-white text-left" v-if="successMessage">
      User is Successfully {{ successMessage }}
    </div>
    <div class="row">
      <div class="col-md-6 photo-title"><h1>Photo Gallery</h1></div>
      <div class="col-md-6 add-button">
        <button
          type="submit"
          v-if="!isFormShow"
          class="btn btn-success"
          @click="addForm"
        >
          <i class="fa fa-plus"></i> Add Photo
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-bind:key="photo.id" v-for="photo in photos">
        <PhotoList
          v-if="!isLoading"
          v-bind:photo="photo"
          v-on:edit-photo="onEditClick"
          v-on:delete-photo="onDeleteClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import PhotoList from "../components/PhotoList";
export default {
  data() {
    return {
      action: "Add",
      currentId: null,
      currentTitle: "",
      currentUrl: "",
      currentThumbnail: "",
      titleErrorMessage: "",
      urlErrorMessage: "",
      thumbnailErrorMessage: "",
      successMessage: "",
      isFormShow: false,
      isLoading: false,
    };
  },

  name: "Photos",
  components: {
    PhotoList,
  },
  setup() {
    const store = useStore();
    const photos = computed(() => store.state.photos);

    function createPhotos(data) {
      store.commit("createPhotos", data);
    }

    function addPhoto(title, url, thumbnailUrl) {
      this.isLoading = true;
      const data = { title, url, thumbnailUrl };
      axios.post(`https://jsonplaceholder.typicode.com/photos`, data).then(
        ({ data }) => {
          store.commit("addPhoto", data);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }

    function editPhoto(id, title, url, thumbnailUrl) {
      this.isLoading = true;
      axios
        .put(`https://jsonplaceholder.typicode.com/photos/${id}`, {
          title,
          url,
          thumbnailUrl,
        })
        .then(
          ({ data }) => {
            const temp = photos.value.map((q) => {
              if (id === q.id) {
                return {
                  ...q,
                  title: data.title,
                  url: data.url,
                  thumbnailUrl: data.thumbnailUrl,
                };
              } else {
                return q;
              }
            });
            store.commit("editPhoto", temp);
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
    }

    function deletePhoto(id) {
      this.isLoading = true;
      axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`).then(
        (res) => {
          console.log(res);
          const temp = photos.value.filter((q) => q.id !== id);
          store.commit("deletePhoto", temp);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }

    function validateUrl(url) {
      return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/.test(
        url
      );
    }

    return {
      validateUrl,
      deletePhoto,
      editPhoto,
      addPhoto,
      createPhotos,
      photos,
    };
  },
  async mounted() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=5"
    );
    this.createPhotos(data);
  },
  methods: {
    test(e) {
      e.preventDefault();
      console.log(this.photos);
    },
    addForm() {
      this.isFormShow = true;
      this.currentTitle = "";
      this.currentUrl = "";
      this.currentThumbnail = "";
      this.currentId = null;
    },
    onEditClick(id, title, url, thumbnail) {
      this.isFormShow = true;
      this.action = "Edit";
      this.currentId = id;
      this.currentTitle = title;
      this.currentUrl = url;
      this.currentThumbnail = thumbnail;
    },
    onDeleteClick(id) {
      this.isFormShow = false;
      this.deletePhoto(id);
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
      console.log(this.currentId);
      this.currentTitle === ""
        ? (this.titleErrorMessage = "Title is required!")
        : (this.titleErrorMessage = "");

      this.currentUrl === ""
        ? (this.urlErrorMessage = "Url is required!")
        : (this.urlErrorMessage = "");
      this.currentThumbnail === ""
        ? (this.thumbnailErrorMessage = "ThumbnailUrl is required!")
        : (this.thumbnailErrorMessage = "");

      if (
        this.currentTitle === "" ||
        this.currentUrl === "" ||
        this.currentThumbnail === ""
      ) {
        return;
      }
      if (!this.currentId || this.currentId === "") {
        if (!this.validateUrl(this.currentUrl)) {
          return (this.urlErrorMessage = "Invalid Url");
        }
        if (!this.validateUrl(this.currentThumbnail)) {
          return (this.thumbnailErrorMessage = "Invalid Thumbnail Url");
        }
        this.addPhoto(
          this.currentTitle,
          this.currentUrl,
          this.currentThumbnail
        );

        this.successMessage = "Added!";
        setTimeout(() => {
          this.successMessage = "";
        }, 1000);
      } else {
        this.editPhoto(
          this.currentId,
          this.currentTitle,
          this.currentUrl,
          this.currentThumbnail
        );
        this.currentTitle = "";
        this.currentUrl = "";
        this.currentThumbnail = "";
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
};
</script>

<style scoped>
.photo-title {
  text-align: left;
}
.add-button {
  align-self: center;
  text-align-last: right;
}
.add-form {
  padding: 1rem 1rem 1rem 1rem;
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
