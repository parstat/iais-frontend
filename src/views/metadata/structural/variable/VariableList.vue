<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Variables
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/variable/add"
              class="card-header-action"
            >
              <CIcon name="cil-plus" />
              <span class="icon-span">New Variable</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <CDataTable
              :items="variables"
              :fields="fields"
              column-filter
              table-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
            >
              <template #actions="{ item }">
                <td style="text-align: right; width: 10%; padding-right: 20px">
                  <span class="pl-2" v-c-tooltip="'View'">
                    <router-link
                      tag="a"
                      title="View"
                      :to="{
                        name: 'VariableView',
                        params: { id: item.id },
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
                        name: 'VariableEdit',
                        params: { id: item.id },
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
                        name: 'VariableDelete',
                        params: { id: item.id },
                      }"
                    >
                       <CIcon name="cil-trash" />
                    </router-link>
                  </span>
                </td>
              </template>
            </CDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "VariableList",
  data() {
    return {
      fields: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Variable Name",
        },
        {
          key: "description",
        },
        {
          key: "version",
        },
        {
          key: "measures",
        },
        {
          key: "actions",
          label: "",
          _style: "",
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variable", ["variables"]),
  },
  created() {
    this.$store.dispatch("variable/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
