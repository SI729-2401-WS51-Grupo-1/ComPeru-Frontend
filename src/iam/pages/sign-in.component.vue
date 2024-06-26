<template>
  <div class="container">
    <div class="form-container">
      <h3 class="p-mb-3">Iniciar Sesión</h3>
      <p class="p-text-center p-mb-5">Por favor ingrese la información requerida para iniciar sesión</p>
      <form @submit.prevent="onSignIn" class="p-fluid">
        <div class="p-field p-mb-4 p-fluid">
          <pv-float-label>
            <pv-input-text id="username" v-model="username" @blur="usernameTouched = true" :class="{'p-invalid': usernameTouched && !username}" />
            <label for="username">Usuario</label>
          </pv-float-label>
          <small v-if="usernameTouched && !username" class="p-invalid">El nombre de usuario es obligatorio.</small>
        </div>
        <div class="p-field p-mb-4 p-fluid">
          <pv-float-label>
            <pv-input-text id="password" v-model="password" type="password" @blur="passwordTouched = true" :class="{'p-invalid': passwordTouched && !password}" />
            <label for="password">Contraseña</label>
          </pv-float-label>
          <small v-if="passwordTouched && !password" class="p-invalid">La contraseña es obligatoria.</small>
        </div>
        <div class="p-mt-4 p-fluid">
          <pv-button type="submit" label="Iniciar Sesión" class="p-button p-button-primary" />
        </div>
        <p class="p-text-center p-mt-3">¿Aún no te has registrado?  <router-link to="/sign-up">Regístrate aquí</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import { SignInRequest } from "@/iam/model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: "",
      usernameTouched: false,
      passwordTouched: false,
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background-image: url('@/assets/img/bus.png');
  background-size: cover;
  background-position: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
}

.p-invalid {
  color: var(--red-500);
}

.p-button {
  width: 100%;
}

.p-field {
  margin-bottom: 1.5rem;
}
</style>
