<template>
  <div class="home"><img alt="Vue logo" src="../assets/logo.png" /></div>
  <h1>NEM-VUE-EXAM</h1>

  <div class="container">
    <HomeCarousel />
  </div>

  <button
    hidden="true"
    type="button"
    id="clickButton"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#staticBackdrop"
  >
    Launch static backdrop modal
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Sign in with Google</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="g-signin2" id="google-signin-btn" @click="removeDisabled" v-on:click="onSignIn"></div>
        </div>
        <div class="modal-footer">
          <button
            hidden="true"
            type="button"
            id="closeModalButton"
            data-dismiss="modal"
            class="btn btn-primary"
          ></button>
          <button
            hidden="true"
            type="button"
            id="closeModalSignin"
            class="btn btn-primary"
            data-dismiss="modal"
          ></button>
          <button type="button" id="btn-disabled" class="btn btn-primary" @click="closeModal" disabled>
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCarousel from "../components/HomeCarousel";
export default {
  name: "Home",
  components: {
    HomeCarousel,
  },
  mounted() {
    this.showModal();
  },
  methods: {
    showModal() {
      const button = document.getElementById("clickButton");
      setTimeout(function() {
        button.click();
      }, 1000);
    },
    removeDisabled() {
      const disabled = document.getElementById("btn-disabled");
      setTimeout(function() {
        disabled.removeAttribute("disabled", "");
      }, 3000);
    },
    closeModal() {
      const button = document.getElementById("closeModalSignin");
      setTimeout(function() {
        button.click();
      }, 1000);
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId());
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
    },
  },
};
</script>

<style scoped>
.modal-body {
  text-align: -webkit-center;
}
</style>
