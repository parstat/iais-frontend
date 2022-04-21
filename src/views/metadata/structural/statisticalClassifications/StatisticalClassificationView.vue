<template>
  <CRow v-if="!isLoading">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="statisticalClassification"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ statisticalClassification.name }}</span>
          <span class="lead"
            >(
            {{
              statisticalClassification.definition ||
              statisticalClassification.localId
            }}
            )</span
          >
        </h2>
        <p class="lead">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ statisticalClassification.description }}
          </span>
        </p>
        <p class="lead">
          <span>
            <strong>{{ $t("structural.link") }}:&nbsp;</strong>
            <a v-bind:href="statisticalClassification.link">
              {{ statisticalClassification.localId }}
              {{ statisticalClassification.version }}
            </a>
          </span>
        </p>
      </div>
    </div>

    <CCard v-if="statisticalClassification" class="mb-3">
      <CCardBody>
        <CCardTitle>
          <span>{{ $t("structural.levels") }}</span>
        </CCardTitle>
        <CCardText>
          <CRow>
            <CCol
              class="col-sm-6 col-md-3 mt-3"
              v-for="level in statisticalClassification.levels"
              :key="level.id"
              ><CCard>
                <CCardBody>
                  <CCardTitle>
                    <span>{{ level.levelNumber }}. {{ level.name }}</span>
                  </CCardTitle>
                  <CCardText>
                    <span>{{ level.description }}</span>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
    <!-- statisticalClassificationItems -->
    <CCard v-if="statisticalClassification">
      <CCardBody>
        <CCardTitle>
          <CNavbar expand="lg" color-scheme="light" class="bg-white">
            <CNavbarBrand href="javascript:void(0);">
              <span>{{
                $t("structural.statistical_classification_items")
              }}</span>
            </CNavbarBrand>
            <CNavbarNav>
              <CDropdown variant="nav-item" :popper="false">
                <CDropdownToggle color="secondary">
                  <span>{{ $t("structural.view") }}</span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="javascript:void(0);" @click="changeView">
                    <span v-if="isHierarchicalView">
                      {{ $t("structural.flat") }}
                    </span>
                    <span v-else>
                      {{ $t("structural.hierarchical") }}
                    </span>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
          </CNavbar>
        </CCardTitle>
        <CCardText v-if="isHierarchicalView">
          <TreeNode
            v-for="node in statisticalClassification.rootItems"
            :key="node.id"
            :node="node"
          ></TreeNode>
        </CCardText>
        <CCardText v-else>
          <div class="table-responsive">
            <CSmartTable
              v-if="flatStatisticalClassificationItems"
              :items="flatStatisticalClassificationItems"
              :activePage="1"
              :columns="columns"
              columnFilter
              cleaner
              itemsPerPageSelect
              :itemsPerPage="15"
              columnSorter
              :sorterValue="{ column: 'order', state: 'asc' }"
              pagination
            ></CSmartTable>
          </div>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          ><span>{{ $t("structural.back") }}</span>
        </CButton>
      </CCardBody>
    </CCard>
  </CRow>
  <CSpinner v-else color="primary" size="sm" />
</template>

<script>
import TreeNode from "@/components/TreeNode";
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "StatisticalClassificationView",
  components: {
    TreeNode,
  },
  data() {
    return {
      isHierarchicalView: true,
      disabled: false,
      flatStatisticalClassificationItems: [],
      columns: [
        {
          key: "code",
          label: this.$i18n.t("structural.code"),
        },
        {
          key: "parentCode",
          label: this.$i18n.t("structural.parent_code"),
        },
        {
          key: "levelNumber",
          label: this.$i18n.t("structural.level_number"),
        },
        {
          key: "value",
          label: this.$i18n.t("structural.value"),
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("statisticalClassification", ["statisticalClassification"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/classifications");
    },
    changeView() {
      this.isHierarchicalView = !this.isHierarchicalView;
      if (this.flatStatisticalClassificationItems.length == 0) {
        this.statisticalClassification.rootItems.forEach((ri) => {
          this.createFlatFileRecursivly(ri, ri.code, "");
        });
      }
    },
    createFlatFileRecursivly(item, rootCode, parentCode) {
      var flatItem = {};
      flatItem.order =
        rootCode !== item.code ? rootCode + item.code : item.code;
      flatItem.code = item.levelNumber
        ? item.code.padStart(item.code.length + item.levelNumber - 1, "-")
        : item.code;
      flatItem.parentCode = parentCode ? parentCode : "";
      flatItem.value = item.value;
      flatItem.levelNumber = item.levelNumber;
      this.flatStatisticalClassificationItems.push(flatItem);
      if (item.children) {
        item.children.forEach((i) =>
          this.createFlatFileRecursivly(i, rootCode, item.code)
        );
      }
    },
  },
  created() {
    this.$store.dispatch(
      "statisticalClassification/findById",
      this.$route.params.id
    );
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem;
  }
}
</style>
