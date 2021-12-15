<template>
  <div class="card w-100" v-if="processQualities">
    <div class="card-header">
      <h5>Process Quality</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processQuality of processQualities"
          :key="processQuality.id"
        >
          <div class="card-header">
            <strong>{{ processQuality.name }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processQuality.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProcessDocumentationQualityView",
  props: {
    processQualities: {
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
