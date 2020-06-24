<template>
  <div class="card w-100" v-if="processDocumentation.documents">
    <div class="card-header">
      <h5>Comments/Notes</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processDocument of processDocumentation.documents"
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
          params: { id: processDocumentation.statisticalProgram.id }
        }"
      >
        Back
      </router-link>
    </div>
  </div>
  <div v-else>
    <div class="card w-100">
      <div class="card-body">
        <router-link
          tag="a"
          class="btn btn-primary btn-sm btn-square"
          :to="{
            name: 'StatisticalProgramView',
            params: { id: processDocumentation.statisticalProgram.id }
          }"
        >
          Back
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationDocumentsView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"])
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
