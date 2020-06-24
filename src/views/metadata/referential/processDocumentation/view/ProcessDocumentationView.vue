<template>
  <div class="row" v-if="processDocumentation">
    <div class="jumbotron jumbotron-fluid col-lg-12">
      <div class="container">
        <h1 class="display-4">
          {{ processDocumentation.statisticalProgram.name }}
          <router-link
            v-if="isAuthenticated"
            tag="a"
            :to="{
              name: 'ProcessDocumentationEdit',
              params: { id: processDocumentation.id }
            }"
          >
            <edit-icon />
          </router-link>
        </h1>

        <p class="lead">
          {{ processDocumentation.businessFunction.localId }}
          {{ processDocumentation.businessFunction.name }}
        </p>
        <hr class="my-4" />
        <p v-if="processDocumentation.frequency" class="lead">
          <strong>Frequency: </strong> {{ processDocumentation.frequency }}
        </p>
        <p v-if="processDocumentation.nextSubPhase" class="lead">
          <strong>Next Process: </strong>
          {{ processDocumentation.nextSubPhase.localId }}
          {{ processDocumentation.nextSubPhase.name }}
        </p>
      </div>
    </div>
    <app-agents></app-agents>
    <app-standards></app-standards>
    <app-methods></app-methods>
    <app-services></app-services>
    <div class="card-columns w-100">
      <app-inputs></app-inputs>
      <app-outputs></app-outputs>
    </div>
    <app-qualities></app-qualities>
    <app-documents @handleBack="handleBack"></app-documents>
  </div>
</template>
<script>
import Agents from "./Agents";
import StatisticalStandards from "./StatisticalStandards";
import ProcessMethods from "./ProcessMethods";
import BusinessServices from "./BusinessServices";
import ProcessInputs from "./ProcessInputs";
import ProcessOutputs from "./ProcessOutputs";
import ProcessQualities from "./ProcessQualities";
import ProcessDocuments from "./ProcessDocuments";

import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("processDocumentation", ["processDocumentation"])
  },
  components: {
    "app-agents": Agents,
    "app-standards": StatisticalStandards,
    "app-methods": ProcessMethods,
    "app-services": BusinessServices,
    "app-inputs": ProcessInputs,
    "app-outputs": ProcessOutputs,
    "app-qualities": ProcessQualities,
    "app-documents": ProcessDocuments
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push(
        "/metadata/referential/view" +
          this.processDocumentation.statisticalProgram.id
      );
    }
  },
  created() {
    this.$store.dispatch(
      "processDocumentation/findById",
      this.$route.params.id
    );
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
