<script>
export default {
  name: "pay-ticket.component",
  data() {
    return {
      selectedBus: null,
      selectedOrigin: null,
      selectedDestination: null,
      typeBus: [
        {name: 'Metropolitano' , code: 'MT'},
        {name: 'Corredor azul' , code: 'CA'}
      ],
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ]
    };
  }
}
</script>

<template>
  <div class="pay-ticket-container">
    <div class="header-section">
      <h1 class="text-3xl font-bold">Pagar Pasaje</h1>
    </div>
    <div class="form">
      <div class="select-field flex align-items-center justify-content-between">
        <p class="text-xl">Seleccionar Bus/Empresa de Transporte:</p>
        <pv-dropdown v-model="selectedBus" editable :options="typeBus" optionLabel="name" placeholder="Selecciona Bus/Empresa" class="w-full md:w-20rem" />
      </div>

      <div class="select-field flex align-items-center justify-content-between">
        <p class="text-xl">Seleccionar Paradero de Origen:</p>
        <pv-dropdown v-model="selectedOrigin" editable :options="cities" optionLabel="name" placeholder="Selecciona Origen" class="w-full md:w-20rem" />
      </div>

      <div class="select-field flex align-items-center justify-content-between">
        <p class="text-xl">Seleccionar Paradero de Destino:</p>
        <pv-dropdown v-model="selectedDestination" editable :options="cities" optionLabel="name" placeholder="Selecciona Destino" class="w-full md:w-20rem" />
      </div>

      <div class="select-field flex align-items-center justify-content-between">
        <p class="text-xl">Total a Pagar:</p>
        <p class="money-mount">S/<span id="quantity">2.50</span></p>
      </div>
    </div>
    <div class="btn-container grid p-3">
      <pv-button label="Pagar con Tarjeta" severity="info" raised/>
      <pv-button label="Pagar con Yape" severity="info" raised/>
      <pv-button label="Pagar con Plin" severity="info" raised/>
      <pv-button label="Pagar con Paypal" severity="info" raised/>
      <pv-button label="Generar Código de Validación" severity="warning" raised/>
    </div>
  </div>
</template>

<style scoped>

.money-mount, #quantity{
  font-weight: bold;
  font-size: 42px;
  color: #0038FF;
}

.btn-container{
  gap: 20px;
}

.select-field{
  gap: 20px;
  margin: 40px 0;
}

.pay-ticket-container{
  margin: 20px 0;
}
</style>