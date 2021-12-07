<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="correspondence">
      <div class=" p-3">
        <h3>
          Source: <i>{{ correspondence.source.name }}</i>
        </h3>

        <h3>
          Target: <i>{{ correspondence.target.name }}</i>
        </h3>
        <div class="display-5">
          Relationship: <i>{{ correspondence.relationship }}</i>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="card ">
        <div class="card-header ">
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
              <template #actions="{item}">
                <td style="text-align:right; width:10%; padding-right:20px;">
                  <span class="pl-2" v-c-tooltip="'View'">
                    <router-link
                      tag="a"
                      title="View"
                      :to="{
                        name: 'MappingsView',
                        params: { id: item.id }
                      }"
                    >
                      <view-icon />
                    </router-link>
                  </span>
                  <span
                    v-if="isAuthenticated"
                    class="pl-2"
                    v-c-tooltip="'Edit'"
                  >
                    <router-link
                      tag="a"
                      title="Edit"
                      :to="{
                        name: 'MappingsEdit',
                        params: { id: item.id }
                      }"
                    >
                      <edit-icon />
                    </router-link>
                  </span>
                  <span
                    v-if="isAuthenticated && isAdmin"
                    class="pl-2"
                    v-c-tooltip="'Delete'"
                  >
                    <router-link
                      tag="a"
                      title="Delete"
                      :to="{
                        name: 'MappingsDelete',
                        params: { id: item.id }
                      }"
                    >
                      <delete-icon />
                    </router-link>
                  </span>
                </td>
              </template>
            </CDataTable>
          </div>
        </div>
        <div class="card-footer ">
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
          key: "id",
          label: "Id"
        },
        {
          key: "sourceCode",
          label: "Source Code"
        },
        {
          key: "targetCode",
          label: "Target Code"
        },
        {
          key: "actions",
          label: "",
          _style: "",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondence"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/correspondence");
    }
  },
  created() {
    this.$store.dispatch("correspondence/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
<style scoped>
.default-value {
  color: lightgray;
}
</style>
