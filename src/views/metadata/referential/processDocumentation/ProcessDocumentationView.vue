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
        <p v-if="processDocumentation.validTo" class="lead">
          <strong>Valid to: </strong> {{ processDocumentation.validTo }}
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
    <div class="card w-100" v-if="processDocumentation.description">
      <div class="card-header">
        <h5>Description</h5>
      </div>
      <div class="card-body">
        <p>{{ processDocumentation.description }}</p>
      </div>
    </div>
    <app-agents :maintainers="processDocumentation.maintainers"></app-agents>
    <app-standards
      :statisticalStandards="processDocumentation.statisticalStandards"
    ></app-standards>
    <app-methods
      :processMethods="processDocumentation.processMethods"
    ></app-methods>
    <app-services
      :businessServices="processDocumentation.businessServices"
    ></app-services>

    <app-inputs
      :processInputSpecifications="
        processDocumentation.processInputSpecifications
      "
    ></app-inputs>
    <app-outputs
      :processOutputSpecifications="
        processDocumentation.processOutputSpecifications
      "
    ></app-outputs>
    <app-qualities
      :processQualities="processDocumentation.processQualities"
    ></app-qualities>
    <app-documents
      :documents="processDocumentation.documents"
      :statisticalProgramId="processDocumentation.statisticalProgram.id"
      @handleBack="handleBack"
    ></app-documents>
  </div>
</template>
<script>
import AgentsView from "../agent/share/AgentsView";
import StatisticalStandardsView from "../statisticalStandard/share/StatisticalStandardsView";
import BusinessServicesView from "../businessService/share/BusinessServicesView";
import ProcessInputView from "../processInput/ProcessInputView";
import ProcessOutputView from "../processOutput/ProcessOutputView";
import ProcessMethodView from "../processMethod/share/ProcessMethodsView";
import ProcessQualityView from "../processQuality/ProcessQualityView";
import ProcessDocumentView from "../processDocuments/ProcessDocumentView";

import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationView",
  components: {
    "app-agents": AgentsView,
    "app-standards": StatisticalStandardsView,
    "app-methods": ProcessMethodView,
    "app-services": BusinessServicesView,
    "app-inputs": ProcessInputView,
    "app-outputs": ProcessOutputView,
    "app-qualities": ProcessQualityView,
    "app-documents": ProcessDocumentView
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
    }
  },
  methods: {
    handleBack() {
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
