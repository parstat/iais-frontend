<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <CIcon name="cil-description" />
            Statistical process
          </CCardTitle>
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
                  <CNavLink href="javascript:void(0);" disabled>
                    LegislativeReference
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
                    Statistical Standards
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
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
                  <app-statistical-program-basic @next="handleBasic" />
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
                  <app-agents-add @back="handleBack" @next="handleSubmit" />
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
import AgentsAdd from "../agent/share/AgentsAdd";

export default {
  name: "StatisticalProgramAdd",
  data() {
    return {
      localId: "",
      name: "",
      acronym: "",
      description: "",
      disabled: false,
      activeTab: 0,
    };
  },
  components: {
    "app-statistical-program-basic": StatisticalProgramBasic,
    "app-agents-add": AgentsAdd,
  },
  methods: {
    handleSubmit(agents) {
      this.disabled = true; //disable buttons
      const formData = {
        localId: this.localId,
        name: this.name,
        acronym: this.acronym,
        description: this.description,
        owner: agents.owner.id,
        maintainer: agents.maintainer.id,
        contact: agents.contact.id,
      };
      this.$store.dispatch("statisticalProgram/save", formData);
      console.log(formData);
    },
    handleBasic(basic) {
      this.localId = basic.localId;
      this.name = basic.name;
      this.acronym = basic.acronym;
      this.description = basic.description;
      this.activeTab++;
    },
    handleBack() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    },
  },
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
