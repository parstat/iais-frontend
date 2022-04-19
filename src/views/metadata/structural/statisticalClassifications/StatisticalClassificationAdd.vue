<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("structural.create_statistical_classification") }}</span>
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
                    ><span>{{ $t("referential.basic") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
                    <span>{{ $t("structural.levels") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
                    <span>{{ $t("structural.items") }}</span>
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
                  <app-statistical-classification-basic @next="handleBasic" />
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
import StatisticalClassificationBasic from "./share/StatisticalClassificationBasic";

import { Context } from "@/common";

export default {
  name: "StatisticalClassificationAdd",
  data() {
    return {
      disabled: false,
      activeTab: 0,
    };
  },
  methods: {
    handleBasic(basic) {
      this.disabled = true;
      const formData = {
        localId: basic.localId,
        name: basic.name,
        version: basic.version,
        description: basic.description,
        definition: basic.definition,
        link: basic.link,
      };
      this.$store.dispatch("statisticalClassification/save", formData);
    },
  },
  components: {
    "app-statistical-classification-basic": StatisticalClassificationBasic,
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
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
