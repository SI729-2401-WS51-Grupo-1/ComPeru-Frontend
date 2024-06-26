<script>
import {Promo} from "@/tracking/model/promos/promo.entity.js";
export default {
  name: "promo-card",
  props: {promo:Promo}
}
</script>

<template>
  <pv-card class="p-col-4 mt-4 mb-4 promo-card">
    <template #header>
      <img class="m-0" :alt="promo.name" :src="promo.image"></img>
    </template>
    <template #content>
      <p class="m-0"> Title: {{ promo.title }} </p>
      <p class="m-0"> Description: {{ promo.description }} </p>
    </template>
  </pv-card>
</template>

<style scoped>
.promo-card {
  width: 50%;
  margin: auto;
  text-align: center;
}
img {
  width: 100%;
}
</style>