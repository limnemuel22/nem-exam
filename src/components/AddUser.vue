<template>
  <div class="container-fluid">
    <h1>Add new User</h1>
    <form>
      <div class="form-group">
        <label for="Name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter Name" required />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Email</label>
        <input type="text" class="form-control" id="email" placeholder="Enter Email" required />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Website</label>
        <input type="text" class="form-control" id="email" placeholder="Enter Website" required />
      </div>

      <button type="submit" class="btn btn-primary mr-2">Submit</button>
      <button type="submit" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  props: ["currentUser"],
  data() {
    return {
      name: "",
      isDisabled: true,
    };
  },
};
</script>
