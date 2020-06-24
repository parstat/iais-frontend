<template>
  <div class="row" v-if="statisticalProgram">
    <div class="jumbotron jumbotron-fluid col-lg-12">
      <div class="container">
        <h1 class="display-4">
          {{ statisticalProgram.name }} ({{ statisticalProgram.acronym }})
        </h1>
        <p class="lead">{{ statisticalProgram.description }}</p>
      </div>
    </div>
    <app-agents @handleBack="handleBack"></app-agents>
    <app-references></app-references>
    <app-standards></app-standards>
    <app-documentations></app-documentations>
  </div>
</template>
<script>
import Agents from "./Agents";
import LegislativeReferences from "./LegislativeReferences";
import StatisticalStandards from "./StatisticalStandards";
import ProcessDocumentations from "./ProcessDocumentations";

import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  components: {
    "app-agents": Agents,
    "app-references": LegislativeReferences,
    "app-standards": StatisticalStandards,
    "app-documentations": ProcessDocumentations
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
