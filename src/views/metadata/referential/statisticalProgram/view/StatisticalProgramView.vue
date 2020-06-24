<template>
  <div class="row" v-if="statisticalProgram">
    <div class="jumbotron jumbotron-fluid col-lg-12">
      <div class="container">
        <h2 class="display-5">
          {{ statisticalProgram.name }} ({{ statisticalProgram.acronym }})
          <router-link
            v-if="isAuthenticated"
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
    <app-agents></app-agents>
    <app-references></app-references>
    <app-standards></app-standards>
    <app-documentations @handleBack="handleBack"></app-documentations>
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
    ...mapGetters("auth", ["isAuthenticated"]),
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
