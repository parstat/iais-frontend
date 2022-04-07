<template>
  <CRow>
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="correspondence"
    >
      <div class="p-3">
        <h3>
          Source:
          <i>
            {{ correspondence.source.name }}
            ({{ correspondence.source.version }})
          </i>
        </h3>

        <h3>
          Target:
          <i>
            {{ correspondence.target.name }}
            ({{ correspondence.target.version }})
          </i>
        </h3>
        <div class="display-5">
          Relationship: <i>{{ correspondence.relationship }}</i>
        </div>
      </div>
    </div>
    <CCard v-if="correspondence">
      <CCardBody>
        <CCardTitle> Mappings </CCardTitle>
        <CCardText>
          <div class="table-responsive">
            <CSmartTable
              :items="correspondence.mappings"
              :columns="columns"
              column-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
            >
            </CSmartTable>
          </div>
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
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "CodeView",
  data() {
    return {
      disabled: false,
      columns: [
        {
          key: "sourceCode",
          label: "Source Code",
        },
        {
          key: "targetCode",
          label: "Target Code",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondence"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/correspondences");
    },
  },
  created() {
    this.$store.dispatch("correspondence/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
.default-value {
  color: lightgray;
}

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
