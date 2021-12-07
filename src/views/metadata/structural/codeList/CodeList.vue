<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Code List
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/code/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Code</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <CDataTable
              :items="codes"
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
                        name: 'CodeView',
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
                        name: 'CodeEdit',
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
                        name: 'CodeDelete',
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "CodeList",
  data() {
    return {
      fields: [
        {
          key: "localId",
          label: "Id"
        },
        {
          key: "name",
          label: "Code Name"
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
    ...mapGetters("code", ["codes"])
  },
  created() {
    this.$store.dispatch("code/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
