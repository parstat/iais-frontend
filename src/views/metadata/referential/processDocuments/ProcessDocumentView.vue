<template>
  <div class="card w-100">
    <div class="card-header">
      <h5>Comments/Notes</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processDocument of documents"
          :key="processDocument.id"
        >
          <div class="card-header">
            <strong>{{ processDocument.name }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processDocument.description }}</p>
            <a
              class="card-link"
              v-if="processDocument.externalLink"
              :href="processDocument.externalLink"
              >Link...</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <router-link
        tag="a"
        class="btn btn-primary btn-sm btn-square"
        :to="{
          name: 'StatisticalProgramView',
          params: { id: statisticalProgramId }
        }"
      >
        Back
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProcessDocumentView",
  props: {
    documents: {
      type: Array,
      required: true,
      default: () => []
    },
    statisticalProgramId: {
      type: Number,
      required: true
    }
  }
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
