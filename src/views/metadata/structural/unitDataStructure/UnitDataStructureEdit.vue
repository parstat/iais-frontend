<template>
  <CRow v-if="unitDataStructure">
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>Create data structure</span>
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
                    ><span>{{ $t("structural.basic") }}</span>
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
                    <span>Records</span>
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
                    <span>Components</span>
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
                  ><template #title>
                    <span>{{ $t("referential.basic") }}</span>
                    <span class="float-right" v-if="editedBasic">
                      <CIcon name="cil-check-alt" />
                    </span>
                  </template>
                  <app-data-structure-add-component
                    :isEdit="true"
                    :selectedLocalId="unitDataStructure.localId"
                    :selectedName="unitDataStructure.name"
                    :selectedDescription="unitDataStructure.description"
                    :selectedVersion="unitDataStructure.version"
                    :selectedVersionDate="unitDataStructure.versionDate"
                    :selectedVersionRationale="
                      unitDataStructure.versionRationale
                    "
                    @next="next"
                  />
                </CTabPane>
              </CTabContent>
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 1"
                >
                  <app-data-structure-records-component
                    :records="unitDataStructure.records"
                    @next="next"
                  />
                </CTabPane>
              </CTabContent>
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 2"
                >
                  <app-data-structure-components-component
                    :components="unitDataStructure.components"
                    :records="unitDataStructure.records"
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
import { mapGetters } from "vuex";
import UnitDatastructureBasic from "./share/UnitDataStructureBasic.vue";
import UnitDataStructureRecords from "./share/UnitDataStructureRecords.vue";
import UnitDataStructureComponents from "./share/UnitDataStructureComponents.vue";

export default {
  name: "UnitDataStructureEdit",
  components: {
    "app-data-structure-add-component": UnitDatastructureBasic,
    "app-data-structure-records-component": UnitDataStructureRecords,
    "app-data-structure-components-component": UnitDataStructureComponents,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    next() {
      this.activeTab++;
    },
  },
  computed: {
    ...mapGetters("unitDataStructure", ["unitDataStructure"]),
  },
  created() {
    this.$store.dispatch("unitDataStructure/findById", this.$route.params.id);
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: uppercase;
}
.nav-item {
  width: 100%;
}
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
