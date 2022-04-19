<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <span>{{ $t("referential.business_function_header") }}</span>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  v-if="isAuthenticated"
                  tag="a"
                  to="/metadata/referential/gsim/function/add"
                  class="card-header-action"
                  ><CIcon name="cil-plus" />
                  <span class="icon-span">
                    {{ $t("referential.add") }}
                  </span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <div class="table-responsive" v-if="!isLoading">
        <CSmartTable
          v-if="businessFunctions.length"
          :activePage="1"
          :items="businessFunctions"
          :columns="columns"
          columnFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'localId', state: 'asc' }"
          pagination
          ><template #actions="{ item }">
            <td>
              <span>
                <router-link
                  tag="a"
                  :to="{
                    name: 'BusinessFunctionView',
                    params: { id: item.id },
                  }"
                  ><CIcon name="cil-magnifying-glass" />
                </router-link>
              </span>
              <span v-if="isAuthenticated">
                <router-link
                  tag="a"
                  :to="{
                    name: 'BusinessFunctionEdit',
                    params: { id: item.id },
                  }"
                  ><CIcon name="cil-pencil" />
                </router-link>
              </span>
              <span v-if="isAdmin">
                <router-link
                  tag="a"
                  :to="{
                    name: 'BusinessFunctionDelete',
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
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "BusinessFunctionList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("referential.ID"),
        },
        {
          key: "phase",
          label: this.$i18n.t("referential.phase"),
        },
        {
          key: "name",
          label: this.$i18n.t("referential.agent_name"),
        },
        {
          key: "description",
          label: this.$i18n.t("referential.description"),
          filter: false,
          sorter: false,
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
    ...mapGetters("businessFunction", ["businessFunctions"]),
    ...mapGetters("coreui", ["isLoading"]),
  },
  created() {
    this.$store.dispatch("businessFunction/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
