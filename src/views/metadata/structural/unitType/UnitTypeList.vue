<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Unit Types
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/unitTypes/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Unit Type</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <CDataTable
              :items="unitTypes"
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
                        name: 'UnitTypeView',
                        params: { id: item.id },
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
                        name: 'UnitTypeEdit',
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
                        name: 'UnitTypeDelete',
                        params: { id: item.id },
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "UnitTypeList",
  data() {
    return {
      fields: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Unit Type Name",
        },
        {
          key: "description",
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
    ...mapGetters("unitType", ["unitTypes"]),
  },
  created() {
    this.$store.dispatch("unitType/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
