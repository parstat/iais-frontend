<template>
  <div class="row">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2"
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

    <div class="card w-100" v-if="statisticalClassification">
      <header class="card-header">
        <h5>Levels</h5>
      </header>
      <div class="card-body">
        <div class="row">
          <CCard
            class="col-sm-6 col-md-3"
            v-for="level in statisticalClassification.levels"
            :key="level.id"
          >
            <CCardBody>
              <CCardTitle>{{ level.levelNumber }}. {{ level.name }}</CCardTitle>
              <CCardText>{{ level.description }}</CCardText>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
    <!-- statisticalClassificationItems -->
    <div class="card w-100" v-if="statisticalClassification">
      <header class="card-header">
        <h5>Statistical Classification Items</h5>
      </header>
      <div class="card-body">
        <TreeNode
          v-for="node in statisticalClassification.rootItems"
          :key="node.id"
          :node="node"
        >
        </TreeNode>
      </div>
      <div class="card-footer">
        <CButton
          color="primary"
          shape="square"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </div>
    </div>
  </div>
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
