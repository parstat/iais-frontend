<template>
  <div class="row" v-if="statisticalProgram">
    <div class="jumbotron jumbotron-fluid col-lg-12">
      <div class="container">
        <h2 class="display-5">
          {{ statisticalProgram.name }} ({{ statisticalProgram.acronym }})
          <router-link
            v-if="isAuthenticated"
            style="float:right; font-size:1.2rem"
            tag="a"
            :to="{
              name: 'StatisticalProgramEdit',
              params: { id: statisticalProgram.id }
            }"
          >
            <edit-icon />
          </router-link>
        </h2>
        <p class="lead">{{ statisticalProgram.description }}</p>
      </div>
    </div>
    <app-agents
      :owner="statisticalProgram.owner"
      :maintainer="statisticalProgram.maintainer"
      :contact="statisticalProgram.contact"
    ></app-agents>
    <app-references
      :legislativeReferences="statisticalProgram.legislativeReferences"
    ></app-references>
    <app-standards
      :statisticalStandards="statisticalProgram.statisticalStandards"
    ></app-standards>
    <app-documentations
      :processDocumentations="statisticalProgram.processDocumentations"
      @back="handleBack"
    ></app-documentations>
  </div>
</template>
<script>
import AgentsView from "../agent/share/AgentsView";
import LegislativeReferencesView from "../legislativeReference/share/LegislativeReferencesView";
import StatisticalStandardsView from "../statisticalStandard/share/StatisticalStandardsView";
import ProcessDocumentationsView from "../processDocumentation/share/ProcessDocumentationsView";

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
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  components: {
    "app-agents": AgentsView,
    "app-references": LegislativeReferencesView,
    "app-standards": StatisticalStandardsView,
    "app-documentations": ProcessDocumentationsView
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential");
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
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
    padding: 1.5rem 2rem;
  }
}
</style>
