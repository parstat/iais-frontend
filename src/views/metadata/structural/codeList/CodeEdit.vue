<template>
  <CRow class="col-12">
    <CCard>
      <CCardHeader class="bg-white">
        <span>Code</span>
      </CCardHeader>
      <CCardBody>
        <CCardText>
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
                    <span>Basic</span>
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
                    <span>Code Items</span>
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
                  <app-code-edit-basic @next="next"></app-code-edit-basic>
                </CTabPane>

                <CTabContent>
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    :visible="activeTab === 1"
                  >
                    <app-code-items></app-code-items>
                  </CTabPane>
                </CTabContent>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  </CRow>
</template>
<script>
import CodeEditBasic from "./edit/CodeEditBasic.vue";
import CodeItems from "./edit/CodeItem.vue";

export default {
  name: "CodeEdit",
  data() {
    return {
      activeTab: 0,
    };
  },
  components: {
    "app-code-edit-basic": CodeEditBasic,
    "app-code-items": CodeItems,
  },
  methods: {
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
  },
  created() {
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
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
