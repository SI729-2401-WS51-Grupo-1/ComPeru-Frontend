<template>
  <div class="p-d-flex p-jc-center p-ai-center p-flex-column container">
    <div class="form-container">
      <h3 class="p-mb-3">Registrarse</h3>
      <p class="p-text-center p-mb-5">Por favor ingrese la información requerida para registrarse</p>
      <form @submit.prevent="onSignUp" class="p-fluid">
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
          <pv-button type="submit" label="Registrarse" class="p-button p-button-primary" />
        </div>
      </form>
      <p class="p-text-center p-mt-3">¿Ya tienes una cuenta? <router-link to="/sign-in">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import { SignUpRequest } from "@/iam/model/sign-up.request.js";
import { useRouter } from 'vue-router';

export default {
  name: 'SignUp',
  setup() {
    const username = ref('');
    const password = ref('');
    const usernameTouched = ref(false);
    const passwordTouched = ref(false);
    const toast = useToast();
    const authenticationStore = useAuthenticationStore();
    const router = useRouter();

    const onSignUp = async () => {
      if (!username.value || !password.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios', life: 3000 });
        return;
      }

      const signUpRequest = new SignUpRequest(username.value, password.value);
      try {
        await authenticationStore.signUp(signUpRequest, router);
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    };

    return {
      username,
      password,
      usernameTouched,
      passwordTouched,
      onSignUp
    };
  }
};
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
  width: 100%;
}
</style>
