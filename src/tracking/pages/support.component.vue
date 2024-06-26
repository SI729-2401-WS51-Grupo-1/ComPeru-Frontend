<template>
  <div class="support-container">
    <pv-card style="width: 100%; overflow: hidden" class="bg-white">
      <template #title>
        <h1 class="titles">Soporte y Ayuda</h1>
      </template>
      <template #content>
        <div class="search-container">
          <pv-inputtext placeholder="Escribe tu duda" class="search-input" />
          <pv-button class="search-button" icon="pi pi-search"></pv-button>
        </div>
      </template>
      <template #footer>
        <pv-button class="whatsapp-button" label="Contacta a un asesor por WhatsAppㅤ" icon="pi pi-whatsapp" iconPos="right"></pv-button>
      </template>
    </pv-card>
  </div>
</template>


<style>
.support-container {
  display: flex;
  justify-content: center;
  width:45vw;
}
.titles {
  color: black;
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: bold;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}


.search-input {
  width: 100%; /* Asegura que ocupe todo el espacio posible en su contenedor */
  background-color: #FFFFFF;
  border: 1px solid #000000;
  color :black;
}
.search-input::placeholder {
  color: black; /* Color del placeholder */
}


.search-button {
  background-color: #0038FF; /* Fondo azul */
  color: white; /* Texto e ícono en blanco */
  border: none; /* Sin bordes */
  border-radius: 20%;
}

.search-button .pi {
  color: white;
  font-size:20px;

}

.whatsapp-button{
  background-color: #0038FF;
  color: white;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.whatsapp-button .pi {
  color: white;
  font-size:40px;
}
.whatsapp-button label {
  padding-right: 20px;
}

</style>
<script>

</script>