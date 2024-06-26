<script>
import {Trip} from "@/tracking/model/trip/trip.entity.js";
import {TripsApiService} from "@/tracking/services/trips/trips-api.service.js";

export default {
  name: "history.component",
  title: "History",
  data() {
    return {
      trips: [],
      trip: null,
      selectedTrips: null,
      filters: {},
      submitted: false,
      tripsService: null
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      console.log('created');
      this.tripService = new TripsApiService();
      this.tripService.getAll()
          .then(response => {
            this.trips = response.data;
            this.trips = this.trips.map(
                (trip) =>{
                  return Trip.toDisplayableTrip(trip)
                }
            );
            console.log(response.data);
          });
    }
  }

}
</script>

<template>
  <pv-data-table ref="dt" v-model:selection="selectedTrips"
                 :filters="filters"
                 :paginator="true"
                 :rows="10"
                 :rowsPerPageOptions="[5, 10, 15]"
                 :value="trips"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} trips"
                 dataKey="id"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
                                    LastPageLink CurrentPageReport RowsPerPageDropdown"
                 responsiveLayout="scroll">

    <template #header>
      <div class="table-header gap-2 align-items-center justify-content-between">
        <h4 class="m-0">Searching my routes</h4>
        <span class="p-input-icon-left">
            <i class="pi pi-search"/>
          </span>
      </div>
    </template>
    <pv-column :sortable="true" field="type" header="type" style="min-width: 16rem"/>
    <pv-column :sortable="true" field="origin" header="origin" style="min-width: 12rem"/>
    <pv-column :sortable="true" field="destination" header="destination" style="min-width: 16rem"/>
    <pv-column :sortable="true" field="startDate" header="startDate" style="min-width: 12rem"/>
    <pv-column :sortable="true" field="endDate" header="endDate" style="min-width: 16rem"/>
    <pv-column :sortable="true" field="price" header="price" style="min-width: 12rem"/>
  </pv-data-table>
</template>

<style scoped>

</style>