<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="statisticalProgram">
        <CCardHeader class="bg-white" component="h5">
          <span
            >{{ $t("referential.statistical_program") }}:
            {{ statisticalProgram.name }}</span
          >
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol class="col-3 mr-2">
              <CNav class="flex-column" variant="pills" role="tab">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 0"
                    @click="
                      () => {
                        activeTab = 0;
                      }
                    "
                  >
                    <span>{{ $t("referential.basic") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 1"
                    @click="
                      () => {
                        activeTab = 1;
                      }
                    "
                  >
                    <span>{{ $t("referential.agents") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 2"
                    @click="
                      () => {
                        activeTab = 2;
                      }
                    "
                  >
                    <span>{{ $t("referential.legislative_reference") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 3"
                    @click="
                      () => {
                        activeTab = 3;
                      }
                    "
                  >
                    <span>{{ $t("referential.statistical_standards") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 4"
                    @click="
                      () => {
                        activeTab = 4;
                      }
                    "
                  >
                    <span>{{ $t("referential.process_documentation") }}</span>
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>
            <CCol class="col-9 ml-2">
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 0"
                >
                  <template #title>
                    <span>{{ $t("referential.basic") }}</span>
                    <span class="float-right" v-if="editedBasic">
                      <CIcon name="cil-check-alt" />
                    </span>
                  </template>
                  <app-statistical-program-basic
                    :localId="statisticalProgram.localId"
                    :name="statisticalProgram.name"
                    :acronym="statisticalProgram.acronym"
                    :description="statisticalProgram.description"
                    @next="handleUpdateBasic"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 1"
                >
                  <template #title>
                    <span>{{ $t("referential.agents") }}</span>
                    <span class="float-right" v-if="editedAgents">
                      <CIcon nam="cil-check-alt" />
                    </span>
                  </template>
                  <app-agents-edit
                    :sp="statisticalProgram"
                    @back="back"
                    @next="nextAgents"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 2"
                >
                  <template #title>
                    <span>{{ $t("referential.legislative_references") }}</span>
                    <span class="float-right" v-if="editedReferences">
                      <CIcon name="cil-check-alt" />
                    </span>
                  </template>
                  <app-references-edit
                    :references="statisticalProgram.legislativeReferences"
                    @addLegislativeReference="handleAddLegislativeReference"
                    @removeLegislativeReference="
                      handleRemoveLegislativeReference
                    "
                    @next="nextReferences"
                    @back="back"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 3"
                >
                  <template #title>
                    <span>{{ $t("referential.statistical_standards") }}</span>
                    <span class="float-right" v-if="editedStandards">
                      <CIcon name="cil-check-alt" />
                    </span>
                  </template>
                  <app-standards-edit
                    :standards="statisticalProgram.statisticalStandards"
                    @addStatisticalStandard="handleAddStatisticalStandard"
                    @removeStatisticalStandard="handleRemoveStatisticalStandard"
                    @next="nextStandards"
                    @back="back"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 4"
                >
                  <app-documentations-edit
                    :statisticalProgramName="statisticalProgram.name"
                    :statisticalProgramId="statisticalProgram.id"
                    :documentations="statisticalProgram.processDocumentations"
                    @back="back"
                    @next="backToList"
                  />
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
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
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  },
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
