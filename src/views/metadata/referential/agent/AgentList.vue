<template>
  <CCard v-if="agents.length">
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle> Agents </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  v-if="isAuthenticated"
                  tag="a"
                  to="/metadata/referential/gsim/agent/add"
                  class="text-decoration-none text-primary"
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">New agent</span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <div class="table-responsive">
          <CSmartTable
            :items="agents"
            :activePage="1"
            :columns="columns"
            columnFilter
            tableFilter
            cleaner
            itemsPerPageSelect
            :itemsPerPage="5"
            columnSorter
            :sorterValue="{ column: 'id', state: 'asc' }"
            pagination
          >
            <template #actions="{ item }">
              <td>
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentView',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </router-link>
                </span>
                <span v-if="isAuthenticated">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentEdit',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-pencil" />
                  </router-link>
                </span>
                <span v-if="isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentDelete',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-trash" />
                  </router-link>
                </span>
              </td>
            </template>
          </CSmartTable>
        </div>
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "AgentList",
  data() {
    return {
      columns: [
        {
          key: "id",
          label: "Id",
        },
        {
          key: "name",
          label: "Agent name",
        },

        {
          key: "description",
          label: "Description",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "actions",
          label: "Actions",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("agent", ["agents"]),
  },
  created() {
    this.$store.dispatch("agent/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
