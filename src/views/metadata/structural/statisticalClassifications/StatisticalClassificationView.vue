<template>
  <CRow v-if="!isLoading">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="statisticalClassification"
    >
      <div class="p-3">
        <h2 class="display-5">
          {{ statisticalClassification.name }}
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
          <strong>Description: </strong>
          {{ statisticalClassification.description }}
        </p>
        <p class="lead">
          <strong>Link: </strong>
          <a v-bind:href="statisticalClassification.link"
            >{{ statisticalClassification.localId }}
            {{ statisticalClassification.version }}
          </a>
        </p>
      </div>
    </div>

    <CCard v-if="statisticalClassification" class="mb-3">
      <CCardBody>
        <CCardTitle> Levels </CCardTitle>
        <CCardText>
          <CRow>
            <CCol
              class="col-sm-6 col-md-3 mt-3"
              v-for="level in statisticalClassification.levels"
              :key="level.id"
            >
              <CCard>
                <CCardBody>
                  <CCardTitle
                    >{{ level.levelNumber }}. {{ level.name }}</CCardTitle
                  >
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
        <CCardTitle> Statistical Classification Items </CCardTitle>
        <CCardText>
          <TreeNode
            v-for="node in statisticalClassification.rootItems"
            :key="node.id"
            :node="node"
          >
          </TreeNode>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
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
      disabled: false,
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
      this.$router.push("/metadata/structural/statisticalClassifications");
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
