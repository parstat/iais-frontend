<template>
  <div class="card">
    <div class="card-header">
      <h5>Process Inputs</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processInputSpecification of processInputSpecifications"
          :key="processInputSpecification.id"
        >
          <div class="card-header">
            <strong>{{ processInputSpecification.name }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processInputSpecification.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProcessInputView",
  props: {
    processInputSpecifications: {
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
