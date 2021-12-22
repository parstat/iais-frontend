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
              <CIcon name="cil-plus" />
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
              <template #sourcename="{ item }">
                <td>
                  {{ item.source.name }}
                </td>
              </template>
              <template #sourceversion="{ item }">
                <td>
                  {{ item.source.version }}
                </td>
              </template>
              <template #targetname="{ item }">
                <td>
                  {{ item.target.name }}
                </td>
              </template>
              <template #targetversion="{ item }">
                <td>
                  {{ item.target.version }}
                </td>
              </template>
              <template #actions="{ item }">
                <td style="text-align: right; width: 10%; padding-right: 20px">
                  <span class="pl-2" v-c-tooltip="'View'">
                    <router-link
                      tag="a"
                      title="View"
                      :to="{
                        name: 'CorrespondenceTableView',
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
                        name: 'CorrespondenceEdit',
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
                        name: 'CorrespondenceDelete',
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
  name: "CorrespondenceTableList",
  data() {
    return {
      fields: [
        {
          key: "sourcename",
          label: "Source Name",
        },
        {
          key: "sourceversion",
          label: "Source Version",
        },
        {
          key: "targetname",
          label: "Target Name",
        },
        {
          key: "targetversion",
          label: "Target Version",
        },
        {
          key: "relationship",
          label: "Relationship",
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
    ...mapGetters("correspondence", ["correspondences"]),
  },
  created() {
    this.$store.dispatch("correspondence/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
