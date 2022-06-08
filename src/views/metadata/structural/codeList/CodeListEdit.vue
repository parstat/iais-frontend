<template>
  <CRow class="col-12">
    <CCard v-if="codeList">
      <CCardHeader class="bg-white">
        <CCardTitle>
          <span>{{ codeList.name }}</span>
        </CCardTitle>
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
                    ><span>{{ $t("structural.items") }}</span>
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
                  ><app-code-list-basic
                    :name="codeList.name"
                    :description="codeList.description"
                    :localId="codeList.localId"
                    :sentinel="codeList.nodeSetType == sentinelCodeList"
                    @next="handleSubmit"
                  ></app-code-list-basic>
                </CTabPane>

                <CTabContent>
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    :visible="activeTab === 1"
                    ><app-code-items :codeList="codeList"></app-code-items>
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
import { NodeSetType } from "@/common";
import CodeListBasic from "./share/CodeListBasic.vue";
import CodeListItems from "./share/CodeListItems.vue";
import { mapGetters } from "vuex";

export default {
  name: "CodeListEdit",
  computed: {
    ...mapGetters("codeList", ["codeList"]),
    sentinelCodeList() {
      console.log(NodeSetType.SentinelCodeList);
      return NodeSetType.SentinelCodeList;
    },
  },
  data() {
    return {
      nodeSetType: "",
      activeTab: 0,
    };
  },
  components: {
    "app-code-list-basic": CodeListBasic,
    "app-code-items": CodeListItems,
  },
  methods: {
    handleSubmit(basic, fieldsChanged) {
      if (fieldsChanged) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.codeList.id,
          name: basic.name.trim(),
          description: basic.description ? basic.description.trim() : "",
          localId: basic.localId,
          sentinel: basic.sentinel,
        };
        this.$store.dispatch("codeList/update", formData).then(() => {
          this.next();
        });
      } else {
        this.next();
      }
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
  },

  created() {
    this.$store.dispatch("codeList/findById", this.$route.params.id);
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
