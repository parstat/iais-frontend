<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          <strong>Statistical processes</strong>
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New process</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <CDataTable
            :items="viewStatisticalPrograms"
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
              <td v-if="isAuthenticated" style="padding: 0.75rem 0.4rem">
                <router-link
                  tag="a"
                  :to="{
                    name: 'StatisticalProgramEdit',
                    params: { id: item.id }
                  }"
                >
                  <edit-icon />
                </router-link>
              </td>
              <td style="padding: 0.75rem 0.4rem">
                <router-link
                  tag="a"
                  :to="{
                    name: 'StatisticalProgramView',
                    params: { id: item.id }
                  }"
                >
                  <view-icon />
                </router-link>
              </td>
              <td
                v-if="isAuthenticated && isAdmin"
                style="padding: 0.75rem 0.4rem"
              >
                <router-link
                  tag="a"
                  :to="{
                    name: 'StatisticalProgramDelete',
                    params: { id: item.id }
                  }"
                >
                  <delete-icon />
                </router-link>
              </td>
            </template>
          </CDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "StatisticalProgramList",
  data() {
    return {
      fields: [
        {
          key: "localId",
          label: "Id"
        },
        {
          key: "name",
          label: "Survey name"
        },
        {
          key: "acronym"
        },
        {
          key: "description"
        },
        {
          key: "owner"
        },
        {
          key: "maintainer"
        },
        {
          key: "contact"
        },
        {
          key: "actions",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("statisticalProgram", ["viewStatisticalPrograms"])
  },
  created() {
    this.$store.dispatch("statisticalProgram/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
