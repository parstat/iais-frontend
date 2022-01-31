<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle> Statistical processes </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end" v-if="isAuthenticated">
                <CNavItem>
                  <span style="padding: 0.75rem 0.4rem">
                    <router-link
                      class="text-decoration-none text-primary"
                      v-if="isAuthenticated"
                      tag="a"
                      to="/metadata/referential/add"
                    >
                      <CIcon name="cil-plus" />
                      Add
                    </router-link>
                  </span>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
          <div class="table-responsive" v-if="!isLoading">
            <CSmartTable
              v-if="viewStatisticalPrograms.length"
              :items="viewStatisticalPrograms"
              :columns="columns"
              column-filter
              table-filter
              items-per-page-select
              :items-per-page="5"
              columnSorter
              pagination
            >
              <template #actions="{ item }">
                <td>
                  <span v-if="isAuthenticated">
                    <router-link
                      tag="a"
                      :to="{
                        name: 'StatisticalProgramEdit',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-pencil" />
                    </router-link>
                  </span>
                  <span>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'StatisticalProgramView',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </router-link>
                  </span>
                  <span v-if="isAuthenticated && isAdmin">
                    <router-link
                      tag="a"
                      :to="{
                        name: 'StatisticalProgramDelete',
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
          <CSpinner v-else color="primary" size="sm" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "StatisticalProgramList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Survey name",
        },
        {
          key: "acronym",
          label: "Acronym",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "owner",
          label: "Owner",
        },
        {
          key: "maintainer",
          label: "Maintainer",
        },
        {
          key: "contact",
          label: "Contact",
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
    ...mapGetters("statisticalProgram", ["viewStatisticalPrograms"]),
    ...mapGetters("coreui", ["isLoading"]),
  },
  created() {
    this.$store.dispatch("statisticalProgram/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
