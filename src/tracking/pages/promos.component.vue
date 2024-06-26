<script>
import {Promo} from "@/tracking/model/promos/promo.entity.js";
import {PromosApiService} from "@/tracking/services/promos/promos-api.service.js";
import PromoList from "@/tracking/components/promo-list.component.vue";
export default {
  name: "promos.component",
  title: 'Promos',
  components: {PromoList},
  data(){
    return {
      promos:[],
      errors:[],
    }
  },
  created(){
    this.getPromos();
  },
  methods: {
    buildPromoListFromResponseData(promos){
      return promos.map(promo => new Promo(promo.id,promo.image, promo.title, promo.description));
    },

    getPromos(){
      const apiService = new PromosApiService();
      apiService.getAll()
          .then(response=> {
            this.promos = this.buildPromoListFromResponseData(response.data);
          })
          .catch(e=>this.errors.push(e))
    }
  }
}
</script>

<template>
    <promo-list :promos="promos"/>
</template>

<style scoped>

</style>