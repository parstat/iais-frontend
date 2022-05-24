<template>
  <CRow v-if="correspondence">
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>
            {{ $t("structural.edit_correspondance_table_between") }}
            {{ correspondence.source.name }}
            {{ $t("structural.and") }}
            {{ correspondence.target.name }}
          </span>
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
                    ><span>{{
                      $t("structural.correspondence_table_mappings")
                    }}</span>
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
                    <span>{{ $t("structural.basic") }}</span>
                    <span class="float-right" v-if="editedBasic">
                      <CIcon name="cil-check-alt" />
                    </span>
                  </template>
                  <app-correspondence-basic
                    @next="handleBasic"
                    :source="correspondence.source"
                    :target="correspondence.target"
                    :relationship="correspondence.relationship"
                    :isEdit="true"
                  />
                </CTabPane>

                <CTabPane
                  role="tabpanel"
                  aria-labelledby="mappings-tab"
                  :visible="activeTab === 1"
                  ><app-correspondence-mappings
                    :sourceId="correspondence.source?.id"
                    :targetId="correspondence.target?.id"
                  ></app-correspondence-mappings>
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
import CorrespondenceTableBasic from "./share/CorrespondenceTableBasic";
import CorrespondenceTableMapping from "./share/CorrespondenceTableMapping.vue";
import { Context } from "@/common";
import { mapGetters } from "vuex";

export default {
  name: "CorrespondenceTableEdit",
  data() {
    return {
      disabled: false,
      activeTab: 0,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondence"]),
  },
  methods: {
    handleBasic(basic) {
      //   this.disabled = true;
      //   const formData = {
      //     id: this.correspondence.id,
      //     sourceId: basic.sourceId,
      //     targetId: basic.targetId,
      //     relationship: basic.relationship,
      //   };
      //   this.$store.dispatch("correspondence/update", formData).then(() => {
      //     this.next();
      //   });
      console.log(basic);
      this.next();
    },
    next() {
      this.activeTab += 1;
    },
  },
  components: {
    "app-correspondence-basic": CorrespondenceTableBasic,
    "app-correspondence-mappings": CorrespondenceTableMapping,
  },
  created() {
    this.$store.dispatch("correspondence/findById", this.$route.params.id);
    this.$store.dispatch("coreui/setContext", Context.Structural);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  },
};
</script>
<style>
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
