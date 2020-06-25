<template>
  <div class="row" v-if="processDocumentation">
    <div class="jumbotron jumbotron-fluid col-lg-12">
      <div class="container">
        <h2 class="display-5">
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
        </h2>

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
          <router-link
            v-if="nextDocumentation"
            tag="a"
            :to="{
              name: 'ProcessDocumentationView',
              params: {
                id: nextDocumentation.id
              }
            }"
          >
            {{ processDocumentation.nextSubPhase.localId }}
            {{ processDocumentation.nextSubPhase.name }}
          </router-link>
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
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),

    nextDocumentation() {
      var nextDocumentation = "";
      if (this.statisticalProgram) {
        nextDocumentation = this.statisticalProgram.processDocumentations.find(
          pd =>
            pd.businessFunction.id === this.processDocumentation.nextSubPhase.id
        );
      }
      return nextDocumentation;
    }
  },
  watch: {
    $route: function(_new, _old) {
      if (_new.params.id !== _old.params.id) {
        this.init();
      }
    },
    "processDocumentation.statisticalProgram": function() {
      if (!this.statisticalProgram) {
        this.$store.dispatch(
          "statisticalProgram/findById",
          this.processDocumentation.statisticalProgram.id
        );
      }
    }
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
    },
    init() {
      this.$store.dispatch(
        "processDocumentation/findById",
        this.$route.params.id
      );
    }
  },
  created() {
    this.init();
  }
};
</script>
<style scoped>
.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem 1rem 2rem;
  }
}
.lead {
  font-size: 1rem;
  margin-bottom: 0.6rem;
}
</style>
