<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <text-icon />
          <strong class="icon-header"
            >Statistical process: {{ statisticalProgram.name }}</strong
          >
        </div>
        <div class="card-body">
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab title="Basic">
              <app-statistical-program-basic
                :localId="statisticalProgram.localId"
                :name="statisticalProgram.name"
                :acronym="statisticalProgram.acronym"
                :description="statisticalProgram.description"
                @next="handleUpdateBasic"
              />
            </CTab>
            <CTab title="Agents">
              <app-agents-edit
                :owner="statisticalProgram.owner"
                :maintainer="statisticalProgram.maintainer"
                :contact="statisticalProgram.contact"
                @updateOwner="handleUpdateOwner"
                @updateMaintainer="handleUpdateMaintainer"
                @updateContact="handleUpdateContact"
                @back="back"
                @next="next"
              />
            </CTab>
            <CTab title="Legislative References">
              <app-references-edit
                :references="statisticalProgram.legislativeReferences"
                @addLegislativeReference="handleAddLegislativeReference"
                @removeLegislativeReference="handleRemoveLegislativeReference"
                @next="next"
                @back="back"
              />
            </CTab>
            <CTab title="Statistical Standards">
              <app-standards-edit
                :standards="statisticalProgram.statisticalStandards"
                @addStatisticalStandard="handleAddStatisticalStandard"
                @removeStatisticalStandard="handleRemoveStatisticalStandard"
                @next="next"
                @back="back"
              />
            </CTab>
            <CTab title="Process Documentations">
              <app-documentations-edit
                :statisticalProgramName="statisticalProgram.name"
                :statisticalProgramId="statisticalProgram.id"
                :documentations="statisticalProgram.processDocumentations"
                @back="backToList"
              />
            </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatisticalProgramBasic from "./StatisticalProgramBasic";
import AgentsEdit from "../agent/share/AgentsEdit";
import LegislativeReferencesEdit from "../legislativeReference/share/LegislativeReferencesEdit";
import StatisticalStandardsEdit from "../statisticalStandard/share/StatisticalStandardsEdit";
import ProcessDocumentationsEdit from "../processDocumentation/share/ProcessDocumentationsEdit";

import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramEdit",
  data() {
    return {
      activeTab: 0
    };
  },
  components: {
    "app-statistical-program-basic": StatisticalProgramBasic,
    "app-agents-edit": AgentsEdit,
    "app-references-edit": LegislativeReferencesEdit,
    "app-standards-edit": StatisticalStandardsEdit,
    "app-documentations-edit": ProcessDocumentationsEdit
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  methods: {
    handleUpdateBasic(basic) {
      const formData = {
        id: this.statisticalProgram.id,
        localId: basic.localId,
        name: basic.name,
        acronym: basic.acronym,
        description: basic.description
      };
      this.$store.dispatch("statisticalProgram/update", formData).then(() => {
        this.next();
      });
    },
    handleUpdateOwner(owner) {
      const formData = {
        id: this.statisticalProgram.id,
        owner: owner.id
      };
      this.$store.dispatch("statisticalProgram/updateOwner", formData);
    },
    handleUpdateMaintainer(maintainer) {
      const formData = {
        id: this.statisticalProgram.id,
        maintainer: maintainer.id
      };
      this.$store.dispatch("statisticalProgram/updateMaintainer", formData);
    },
    handleUpdateContact(contact) {
      const formData = {
        id: this.statisticalProgram.id,
        contact: contact.id
      };
      this.$store.dispatch("statisticalProgram/updateContact", formData);
    },
    handleAddLegislativeReference(regulation) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: regulation.id
      };
      this.$store.dispatch(
        "statisticalProgram/addLegislativeReference",
        formData
      );
    },
    handleRemoveLegislativeReference(regulation) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: regulation.id
      };
      this.$store.dispatch(
        "statisticalProgram/removeLegislativeReference",
        formData
      );
    },
    handleAddStatisticalStandard(standard) {
      const formData = {
        id: this.statisticalProgram.id,
        standard: standard.id
      };
      this.$store.dispatch(
        "statisticalProgram/addStatisticalStandard",
        formData
      );
    },
    handleRemoveStatisticalStandard(standard) {
      const formData = {
        id: this.statisticalProgram.id,
        standard: standard.id
      };
      this.$store.dispatch(
        "statisticalProgram/removeStatisticalStandard",
        formData
      );
    },
    backToList() {
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
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  }
};
</script>
