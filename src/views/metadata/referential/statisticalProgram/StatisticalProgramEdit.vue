<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
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
            <CTab>
              <template #title>
                <span>Basic</span>
                <span class="float-right" v-if="editedBasic"
                  ><check-icon
                /></span>
              </template>
              <app-statistical-program-basic
                :localId="statisticalProgram.localId"
                :name="statisticalProgram.name"
                :acronym="statisticalProgram.acronym"
                :description="statisticalProgram.description"
                @next="handleUpdateBasic"
              />
            </CTab>
            <CTab>
              <template #title>
                <span>Agents</span>
                <span class="float-right" v-if="editedAgents"
                  ><check-icon
                /></span>
              </template>
              <app-agents-edit
                :owner="statisticalProgram.owner"
                :maintainer="statisticalProgram.maintainer"
                :contact="statisticalProgram.contact"
                @updateOwner="handleUpdateOwner"
                @updateMaintainer="handleUpdateMaintainer"
                @updateContact="handleUpdateContact"
                @back="back"
                @next="nextAgents"
              />
            </CTab>
            <CTab>
              <template #title>
                <span>Legislative References</span>
                <span class="float-right" v-if="editedReferences"
                  ><check-icon
                /></span>
              </template>
              <app-references-edit
                :references="statisticalProgram.legislativeReferences"
                @addLegislativeReference="handleAddLegislativeReference"
                @removeLegislativeReference="handleRemoveLegislativeReference"
                @next="nextReferences"
                @back="back"
              />
            </CTab>
            <CTab>
              <template #title>
                <span>Statistical Standards</span>
                <span class="float-right" v-if="editedStandards"
                  ><check-icon
                /></span>
              </template>
              <app-standards-edit
                :standards="statisticalProgram.statisticalStandards"
                @addStatisticalStandard="handleAddStatisticalStandard"
                @removeStatisticalStandard="handleRemoveStatisticalStandard"
                @next="nextStandards"
                @back="back"
              />
            </CTab>
            <CTab title="Process Documentations">
              <app-documentations-edit
                :statisticalProgramName="statisticalProgram.name"
                :statisticalProgramId="statisticalProgram.id"
                :documentations="statisticalProgram.processDocumentations"
                @back="back"
                @next="backToList"
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
      activeTab: 0,
      editedBasic: false,
      editedAgents: false,
      editedReferences: false,
      editedStandards: false,
    };
  },
  components: {
    "app-statistical-program-basic": StatisticalProgramBasic,
    "app-agents-edit": AgentsEdit,
    "app-references-edit": LegislativeReferencesEdit,
    "app-standards-edit": StatisticalStandardsEdit,
    "app-documentations-edit": ProcessDocumentationsEdit,
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
  },
  methods: {
    handleUpdateBasic(basic, fieldsChanged) {
      if (fieldsChanged) {
        const formData = {
          id: this.statisticalProgram.id,
          localId: basic.localId,
          name: basic.name,
          acronym: basic.acronym,
          description: basic.description,
        };
        this.$store.dispatch("statisticalProgram/update", formData).then(() => {
          this.editedBasic = true;
          this.next();
        });
      } else {
        //do nothing
        this.next();
      }
    },
    handleUpdateOwner(owner) {
      const formData = {
        id: this.statisticalProgram.id,
        owner: owner.id,
      };
      this.$store.dispatch("statisticalProgram/updateOwner", formData);
    },
    handleUpdateMaintainer(maintainer) {
      const formData = {
        id: this.statisticalProgram.id,
        maintainer: maintainer.id,
      };
      this.$store.dispatch("statisticalProgram/updateMaintainer", formData);
    },
    handleUpdateContact(contact) {
      const formData = {
        id: this.statisticalProgram.id,
        contact: contact.id,
      };
      this.$store.dispatch("statisticalProgram/updateContact", formData);
    },
    handleAddLegislativeReference(regulation) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: regulation.id,
      };
      this.$store.dispatch(
        "statisticalProgram/addLegislativeReference",
        formData
      );
    },
    handleRemoveLegislativeReference(regulation) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: regulation.id,
      };
      this.$store.dispatch(
        "statisticalProgram/removeLegislativeReference",
        formData
      );
    },
    handleAddStatisticalStandard(standard) {
      const formData = {
        id: this.statisticalProgram.id,
        standard: standard.id,
      };
      this.$store.dispatch(
        "statisticalProgram/addStatisticalStandard",
        formData
      );
    },
    handleRemoveStatisticalStandard(standard) {
      const formData = {
        id: this.statisticalProgram.id,
        standard: standard.id,
      };
      this.$store.dispatch(
        "statisticalProgram/removeStatisticalStandard",
        formData
      );
    },
    nextAgents(fieldsChanged) {
      this.editedAgents = fieldsChanged;
      this.next();
    },
    nextReferences(fieldsChanged) {
      this.editedReferences = fieldsChanged;
      this.next();
    },
    nextStandards(fieldsChanged) {
      this.editedStandards = fieldsChanged;
      this.next();
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
    },
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  },
};
</script>

<style scoped>
.material-design-icon {
  vertical-align: middle;
  height: 0.8em !important;
  width: 1.2em !important;
}
</style>
