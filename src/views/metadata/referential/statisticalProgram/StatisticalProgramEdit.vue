<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="statisticalProgram">
        <CCardHeader component="h5">
          Statistical process: {{ statisticalProgram.name }}
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
                    Basic
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
                    Agents
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
                    LegislativeReference
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
                    Statistical Standards
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
                    Process Documentation
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
                    <span>Basic</span>
                    <span class="float-right" v-if="editedBasic"
                      ><CIcon name="cil-check-alt"
                    /></span>
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
                    <span>Agents</span>
                    <span class="float-right" v-if="editedAgents"
                      ><CIcon nam="cil-check-alt"
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
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 2"
                >
                  <template #title>
                    <span>Legislative References</span>
                    <span class="float-right" v-if="editedReferences"
                      ><CIcon name="cil-check-alt"
                    /></span>
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
                    <span>Statistical Standards</span>
                    <span class="float-right" v-if="editedStandards"
                      ><CIcon name="cil-check-alt" 
                    /></span>
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
