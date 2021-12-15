<template>
  <div class="card w-100">
    <div class="card-header">
      <h5>Legislative References</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="legislativeReference of legislativeReferences"
          :key="legislativeReference.id"
        >
          <div class="card-header">
            <strong>{{ legislativeReference.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                :to="{
                  name: 'LegislativeReferenceView',
                  params: { id: legislativeReference.id },
                }"
              >
                <view-icon />
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ legislativeReference.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LegislativeReferencessView",
  props: {
    legislativeReferences: {
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
