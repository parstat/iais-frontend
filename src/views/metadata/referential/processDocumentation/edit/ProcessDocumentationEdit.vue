<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="processDocumentation">
        <CCardHeader component="h5">
          <CIcon name="cil-description" />
          Process Documentation
          <h6 class="card-subtitle mb-2 text-muted">
            (survey:
            {{
              processDocumentation.statisticalProgram
                ? processDocumentation.statisticalProgram.name
                : ""
            }}, sub-phase:
            {{
              processDocumentation.businessFunction
                ? processDocumentation.businessFunction.localId
                : ""
            }}
            {{
              processDocumentation.businessFunction
                ? processDocumentation.businessFunction.name
                : ""
            }})
          </h6>
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
                    Divisions
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
                    StatisticalStandards
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
                    Process Methods
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
                    Business Service/Software
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 5"
                    @click="
                      () => {
                        activeTab = 5;
                      }
                    "
                  >
                    Process Input
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 6"
                    @click="
                      () => {
                        activeTab = 6;
                      }
                    "
                  >
                    Provess Output
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 7"
                    @click="
                      () => {
                        activeTab = 7;
                      }
                    "
                  >
                    Process Quality
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 8"
                    @click="
                      () => {
                        activeTab = 8;
                      }
                    "
                  >
                    Comments/Notes
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>
            <CCol class="col-9">
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 0"
                >
                  <app-process-documentation @next="next">
                  </app-process-documentation>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 1"
                >
                  <app-agents @back="back" @next="next"></app-agents>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 2"
                >
                  <app-standards @next="next" @back="back"></app-standards>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 3"
                >
                  <app-methods @next="next" @back="back"></app-methods>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 4"
                >
                  <app-services @next="next" @back="back"></app-services>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 5"
                >
                  <app-inputs @next="next" @back="back"></app-inputs>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 6"
                >
                  <app-outputs @next="next" @back="back"></app-outputs>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 7"
                >
                  <app-qualities @next="next" @back="back"></app-qualities>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 8"
                >
                  <app-documents @finish="finish"></app-documents>
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
      activeTab: 0,
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
    "app-documents": ProcessDocuments,
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
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
    finish() {
      this.$router.push(
        "/metadata/referential/edit/" +
          this.processDocumentation.statisticalProgram.id +
          "?step=5"
      );
    },
  },
  created() {
    this.$store.dispatch(
      "processDocumentation/findById",
      this.$route.params.id
    );
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
