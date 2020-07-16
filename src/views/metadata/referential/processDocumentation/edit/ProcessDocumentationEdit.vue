<template>
  <div class="row" v-if="processDocumentation">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <p>
            <text-icon />
            <strong class="icon-header">Process Documentation</strong>
          </p>
          <h6 class="card-subtitle mb-2 text-muted">
            (survey: {{ statisticalProgram ? statisticalProgram.name : "" }},
            sub-phase: {{ businessFunction ? businessFunction.localId : "" }}
            {{ businessFunction ? businessFunction.name : "" }})
          </h6>
        </div>
        <div class="card-body">
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab title="Basic">
              <app-process-documentation @next="next">
              </app-process-documentation>
            </CTab>
            <CTab title="Divisions">
              <app-agents @back="back" @next="next"></app-agents>
            </CTab>
            <CTab title="Statistical Standards">
              <app-standards @next="next" @back="back"></app-standards>
            </CTab>
            <CTab title="Process Methods">
              <app-methods @next="next" @back="back"></app-methods>
            </CTab>
            <CTab title="Business Services/Software">
              <app-services @next="next" @back="back"></app-services>
            </CTab>
            <CTab title="Process Inputs">
              <app-inputs @next="next" @back="back"></app-inputs>
            </CTab>
            <CTab title="Process Outputs">
              <app-outputs @next="next" @back="back"></app-outputs>
            </CTab>
            <CTab title="Process Quality">
              <app-qualities @next="next" @back="back"></app-qualities>
            </CTab>
            <CTab title="Process Comments/Notes">
              <app-documents @finish="finish"></app-documents>
            </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Agents from "./Agents";
import StatisticalStandards from "./StatisticalStandards";
import ProcessDocumentation from "./ProcessDocumentation";
import ProcessMethods from "./ProcessMethods";
import BusinessServices from "./BusinessServices";
import ProcessInputs from "./ProcessInputs";
import ProcessOutputs from "./ProcessOutputs";
import ProcessQualities from "./ProcessQualities";
import ProcessDocuments from "./ProcessDocuments";

import { mapGetters } from "vuex";
//import { required } from "vuelidate/lib/validators";

export default {
  name: "ProcessDocumentationEdit",
  data() {
    return {
      disabled: false,
      activeTab: 0
    };
  },
  components: {
    "app-agents": Agents,
    "app-standards": StatisticalStandards,
    "app-process-documentation": ProcessDocumentation,
    "app-methods": ProcessMethods,
    "app-services": BusinessServices,
    "app-inputs": ProcessInputs,
    "app-outputs": ProcessOutputs,
    "app-qualities": ProcessQualities,
    "app-documents": ProcessDocuments
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"])
  },

  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/");
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    },
    finish() {
      this.$router.push(
        "/metadata/referential/edit/" +
          this.processDocumentation.statisticalProgram.id +
          "?step=5"
      );
    }
  },
  created() {
    this.$store.dispatch(
      "processDocumentation/findById",
      this.$route.params.id
    );
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  }
};
</script>

<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-left-width: 4px;
  border-left-style: solid;
  background-color: #f8f8f8;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #321fdb;
  color: #321fdb;
  border-radius: unset;
  padding-left: 0.8rem;
}
</style>
