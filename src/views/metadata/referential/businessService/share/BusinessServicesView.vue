<template>
  <div class="card w-100" v-if="businessServices">
    <div class="card-header">
      <h5>Business Services/Software</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="businessService of businessServices"
          :key="businessService.id"
        >
          <div class="card-header">
            <strong>{{ businessService.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                :to="{
                  name: 'BusinessServiceView',
                  params: { id: businessService.id },
                }"
              >
                <view-icon />
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ businessService.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProcessServicesView",
  props: {
    businessServices: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
  box-shadow: none !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.material-design-icon {
  margin-bottom: 0.2rem;
}
</style>
