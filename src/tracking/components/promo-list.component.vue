<script>
import PromoCard from "@/tracking/components/promo-card.component.vue";
export default {
  name: "promo-list",
  components: {PromoCard},
  props: {
    promos: {
      type: Array,
      required: true
    }
  },
}
</script>

<template>
  <div class="p-grid">
    <promo-card v-for="(promo,index) in promos" :key="index" :promo="promo"/>
  </div>
</template>

<style scoped>

</style>