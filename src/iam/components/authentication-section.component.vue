<script>
import {useRouter} from "vue-router";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

export default {
  name: "authentication-section",
  data() {
    return {
      router: useRouter(),
      authenticationStore: useAuthenticationStore()
    };
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    },
  },
  methods: {
    onSignIn() {
      this.router.push({name: 'sign-in'});
    },
    onSignUp() {
      this.router.push({name: 'sign-up'});
    },
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    }
  }
}
</script>

<template>
  <div class="p-d-flex p-jc-center p-ai-center p-flex-column">
    <div v-if="isSignedIn" class="p-mb-3">
      <span class="p-button"> Welcome, {{ currentUsername }}</span>
      <pv-button class="p-button p-button-rounded p-button-outlined" @click="onSignOut">Sign Out</pv-button>
    </div>
    <div v-else class="p-d-flex p-jc-center p-ai-center p-flex-column">
      <pv-button class="p-button p-button-rounded p-button-outlined p-mb-3" @click="onSignIn">Sign In</pv-button>
      <pv-button class="p-button p-button-rounded p-button-outlined" @click="onSignUp">Sign Up</pv-button>
    </div>
  </div>
</template>

<style scoped>
.p-button-outlined {
  background-color: white;
  color: black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>