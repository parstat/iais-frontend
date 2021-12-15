<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="correspondence">
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
    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5>Mappings</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <CDataTable
              :items="correspondence.mappings"
              :fields="fields"
              column-filter
              table-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
            >
            </CDataTable>
          </div>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "CodeView",
  data() {
    return {
      disabled: false,
      fields: [
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
      this.$router.push("/metadata/structural/correspondence");
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
</style>
