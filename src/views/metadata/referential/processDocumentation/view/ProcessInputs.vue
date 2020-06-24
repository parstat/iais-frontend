<template>
  <div class="card" v-if="processDocumentation.processInputSpecifications">
    <div class="card-header">
      <h5>Process Inputs</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processInputSpecification of processDocumentation.processInputSpecifications"
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
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationInputsView",
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
