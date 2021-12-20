<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Statistical Classifications
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/statisticalClassifications/add"
              class="card-header-action"
            >
              <CIcon name="cil-plus" />
              <span class="icon-span">New Statistical Classifications</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <VueGoodTable
              :rows="statisticalClassifications"
              :columns="fields"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
              }"
            >
              <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                  <span class="pl-2" v-c-tooltip="'View'">
                    <router-link
                      tag="a"
                      title="View"
                      :to="{
                        name: 'StatisticalClassificationView',
                        params: { id: props.row.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
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
                        name: 'StatisticalClassificationEdit',
                        params: { id: props.row.id },
                      }"
                    >
                      <CIcon name="cil-pencil" />
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
                        name: 'StatisticalClassificationDelete',
                        params: { id: props.row.id },
                      }"
                    >
                      <CIcon name="cil-trash" />
                    </router-link>
                  </span>
                </span>
              </template>
            </VueGoodTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";
import { VueGoodTable } from "vue-good-table-next";

export default {
  name: "StatisticalClassificationsList",
  data() {
    return {
      fields: [
        {
          field: "localId",
          label: "Id",
        },
        {
          field: "name",
          label: "Name",
        },
        {
          field: "version",
          label: "Version",
        },
        {
          field: "versionDate",
          label: "Version Date",
        },
        {
          field: "actions",
          label: "Actions",
        },
      ],
    };
  },
  components: {
    VueGoodTable,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("statisticalClassification", ["statisticalClassifications"]),
  },
  created() {
    this.$store.dispatch("statisticalClassification/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
