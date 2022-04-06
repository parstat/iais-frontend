<template>
  <CRow>
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3" v-if="codeList">
      <div class="p-3">
        <h2 class="display-5">
          {{ codeList.name }}
          <span class="lead"
            >( {{ codeList.version || codeList.localId }} )</span
          >
        </h2>
        <p class="lead">
          <span><strong>Description:</strong></span> {{ codeList.description }}
        </p>
      </div>
    </div>
    <CCard>
      <CCardBody>
        <CCardTitle>
          <span>Code Items</span>
        </CCardTitle>
        <CCardText>
          <div class="table-responsive" v-if="!isLoading">
            <CSmartTable
              v-if="codeList"
              :items="codeList.codeItems"
              :activePage="1"
              :columns="columns"
              columnFilter
              cleaner
              itemsPerPageSelect
              :itemsPerPage="5"
              columnSorter
              :sorterValue="{ column: 'code', state: 'asc' }"
              pagination
            >
            </CSmartTable>
          </div>
          <CSpinner v-else color="primary" size="sm" />
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
  name: "CodeListView",
  data() {
    return {
      disabled: false,
      columns: [
        {
          key: "code",
          label: "Code",
        },
        {
          key: "value",
          label: "Value",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("codeList", ["codeList"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/codelist");
    },
  },
  created() {
    this.$store.dispatch("codeList/findById", this.$route.params.id);
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
