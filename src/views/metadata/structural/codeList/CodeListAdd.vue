<template>
  <CRow class="col-12">
    <CCard>
      <CCardHeader class="bg-white">
        <span>{{ $t("structural.code") }}</span>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol class="col-3 mr-2">
              <CNav class="flex-column" variant="pills" role="tab">
                <CNavItem>
                  <CNavLink href="javascript:void(0);" active>
                    <span>{{ $t("structural.basic") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
                    <span>{{ $t("structural.code_items") }}</span>
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>

            <CCol class="col-9">
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="true"
                >
                  <app-code-list-basic
                    @next="handleSubmit"
                  ></app-code-list-basic>
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  </CRow>
</template>
<script>
import CodeListBasic from "./share/CodeListBasic.vue";

export default {
  name: "CodeListAdd",
  components: {
    "app-code-list-basic": CodeListBasic,
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    handleSubmit(basic) {
      this.disabled = true; //disable buttons
      const formData = {
        name: basic.name.trim(),
        description: basic.description ? basic.description.trim : "",
        localId: basic.localId.trim().toUpperCase(),
        isSentinel: basic.sentinel,
      };
      this.$store.dispatch("code/save", formData);
      console.log(formData);
    },
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
