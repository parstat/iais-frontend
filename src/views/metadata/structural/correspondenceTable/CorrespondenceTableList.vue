<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Correspondence Tables
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/correspondence/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Correspondence</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <CDataTable
              :items="correspondences"
              :fields="fields"
              column-filter
              table-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
            >
              <template #sourcename="{item}">
                <td>
                  {{ item.source.name }}
                </td>
              </template>
              <template #targetname="{item}">
                <td>
                  {{ item.target.name }}
                </td>
              </template>
              <template #actions="{item}">
                <td style="text-align:right; width:10%; padding-right:20px;">
                  <span class="pl-2" v-c-tooltip="'View'">
                    <router-link
                      tag="a"
                      title="View"
                      :to="{
                        name: 'CorrespondenceTableView',
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
                        name: 'CorrespondenceEdit',
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
                        name: 'CorrespondenceDelete',
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
  name: "CorrespondenceTableList",
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "Id"
        },
        {
          key: "relationship",
          label: "Relationship"
        },

        {
          key: "sourcename",
          label: "Source Name"
        },
        {
          key: "targetname",
          label: "Target Name"
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
    ...mapGetters("correspondence", ["correspondences"])
  },
  created() {
    this.$store.dispatch("correspondence/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
