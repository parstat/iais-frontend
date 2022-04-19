<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <span>{{ $t("referential.agents") }}</span>
          </CCardTitle>
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
                  ><CIcon name="cil-plus" />
                  <span class="icon-span">
                    {{ $t("referential.new_agent") }}
                  </span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <div class="table-responsive" v-if="!isLoading">
          <CSmartTable
            v-if="agents.length"
            :items="agents"
            :activePage="1"
            :columns="columns"
            columnFilter
            cleaner
            itemsPerPageSelect
            :itemsPerPage="5"
            columnSorter
            :sorterValue="{ column: 'id', state: 'asc' }"
            pagination
            ><template #actions="{ item }">
              <td>
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentView',
                      params: { id: item.id },
                    }"
                    ><CIcon name="cil-magnifying-glass" />
                  </router-link>
                </span>
                <span v-if="isAuthenticated">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentEdit',
                      params: { id: item.id },
                    }"
                    ><CIcon name="cil-pencil" />
                  </router-link>
                </span>
                <span v-if="isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentDelete',
                      params: { id: item.id },
                    }"
                    ><CIcon name="cil-trash" />
                  </router-link>
                </span>
              </td>
            </template>
          </CSmartTable>
        </div>
        <CSpinner v-else color="primary" size="sm" />
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
          label: this.$i18n.t("referential.ID"),
        },
        {
          key: "name",
          label: this.$i18n.t("referential.agent_name"),
        },

        {
          key: "description",
          label: this.$i18n.t("referential.description"),
        },
        {
          key: "type",
          label: this.$i18n.t("referential.type"),
        },
        {
          key: "actions",
          label: this.$i18n.t("referential.actions"),
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
