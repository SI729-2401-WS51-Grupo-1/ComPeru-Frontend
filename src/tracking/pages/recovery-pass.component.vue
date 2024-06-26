<script>
import {UsersApiService} from "@/tracking/services/users/users-api.service.js";
import {User} from "@/tracking/model/users/user.entity.js";

export default {
  name: "recovery-pass.component",
  title: "Recovery Password",
  data() {
    return {
      users: [],
      userService: null
    }
  },
  created(){

  },
  methods:{
    initialize() {
      console.log('created');
      this.userService = new UsersApiService();
      this.userService.getAllUsers()
          .then(response => {
            this.users = response.data;
            this.users = this.users.map(
                (users) => {
                  return User.toDisplayableUser(users);
                }
            );
            console.log(response.data)
          });
    }
  }
}
</script>

<template>
  <div class="recov-pass-header gap-2 align-items-center justify-content-between">
    <span class="m-0">Recovery Password</span>
  </div>
  <div class="recov-pass-container" v-for="user in users">
    <p> Contraseña Actual : {{ user.password }} </p>
    <p><input type="text" placeholder="Contraseña Actual" v-model="actual password"> </p>
  </div>
</template>

<style scoped>

</style>