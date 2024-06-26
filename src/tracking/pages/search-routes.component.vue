<script>
export default {
  name: "search-routes.component",
  data() {
    return {
      loading: false,
      selectedOrigin: null,
      selectedDestination: null,
      stops: [
        { name: 'Centro de Lima'},
        { name: 'Barranco'},
        { name: 'Miraflores'},
        { name: 'Av. Arequipa'},
        { name: 'Angamos'}
      ]
    };
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  }
};
</script>

<template>
  <div class="form_container">
    <pv-dropdown v-model="selectedOrigin" editable :options="stops" optionLabel="name" placeholder="Origen" class="w-full md:w-20rem" />
    <pv-dropdown v-model="selectedDestination" editable :options="stops" optionLabel="name" placeholder="Destino" class="w-full md:w-20rem" />
    <pv-button type="button" label="Search" icon="pi pi-search" :loading="loading" @click="load" class="w-full md:w-8rem"/>
  </div>
  <div class="map_container">
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15612.47171388243!2d-77.11399785!3d-11.966336250000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1714806679282!5m2!1ses-419!2spe" width="1000" height="800" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</template>

<style scoped>
.form_container{
  display: flex;
  gap: 30px;
  margin: 20px;
}

.map_container{
  margin:20px;
}

.map_container iframe{
  border-radius: 10px;
}
</style>