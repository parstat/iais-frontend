<template>
  <div class="card w-100" v-if="processDocumentation.processQualities">
    <div class="card-header">
      <h5>Process Qulaity</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processQuality of processDocumentation.processQualities"
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
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationQualitiesView",
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
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.card-header {
  padding-top: 1rem;
}
</style>
