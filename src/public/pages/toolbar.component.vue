<template>
  <pv-toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
      <div class="menu-items flex align-items-center gap-2">
        <h1 class="toolbar-title">TrackMyRoute</h1>
        <router-link v-if="isLoggedIn" v-for="item in items" :key="item.label" v-slot="{ navigate, href }" :to="item.to" custom>
          <pv-button :href="href" class="p-button-text p-button-plain text-sm" @click="navigate" style="color: blue;">
            {{ item.label }}
          </pv-button>
        </router-link>
      </div>
    </template>

    <template #end>
      <div class="icons-container flex align-items-center gap-2">
        <pv-button
            v-if="isLoggedIn"
            icon="pi pi-cog"
            class="p-button-rounded p-button-text p-button-plain"
            aria-label="Settings"
            @click="navigateTo('/config')"
        />
        <pv-button
            v-if="isLoggedIn"
            icon="pi pi-question-circle"
            class="p-button-rounded p-button-text p-button-plain"
            severity="primary"
            aria-label="support"
            @click="navigateTo('/support')"
        />
        <authentication-section/>
      </div>
    </template>
  </pv-toolbar>
  <router-view></router-view>
</template>

<script setup>
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import AuthenticationSection from "@/iam/components/authentication-section.component.vue";
//import { onMounted, ref } from "vue";
import router from "@/router/index.js";
//import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { computed } from 'vue';

/* const visibleRight = ref(false);
const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user){
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
  });
}); */

/*const handleSignOut = () => {
  signOut(auth)
      .then(() => {
        console.log("SignOut");
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
};*/

const items = [
  { label: "Notificaciones", to: "/notifications" },
  { label: "Buscar rutas", to: "/search-routes" },
  { label: "Pagar pasaje", to: "/pay-ticket" },
  { label: "Promociones", to: "/promos" },
  { label: "Historial de viajes", to: "/history" }
];

const navigateTo = (route) => {
  router.push(route);
};

const isLoggedIn = computed(() => useAuthenticationStore().isSignedIn);

</script>

<style scoped>
.toolbar-title {
  font-family: 'MuseoModerno', sans-serif;
  font-size: 1.5em;
  margin: 0 5px;
}

.menu-items {
  display: flex;
  flex-wrap: wrap;
}

.icons-container {
  margin: 0 20px;
}

@media (max-width: 768px) {
  .toolbar-title {
    font-size: 1.2em;
  }

  .menu-items {
    display: none;
  }

  .icons-container {
    margin: 0;
  }
}
</style>
