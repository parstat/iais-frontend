<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle> Measurement Units </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/measurementUnits/add"
                    class="text-decoration-none text-primary"
                  >
                    <CIcon name="cil-plus" />
                    <span class="icon-span">New Measurement Unit</span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>

          <CCardText>
            <div class="table-responsive" v-if="!isLoading">
              <CSmartTable
                v-if="measurementUnits.length"
                :items="measurementUnits"
                :activePage="1"
                header
                :columns="columns"
                columnFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                :sorterValue="{ column: 'localId', state: 'asc' }"
                pagination
              >
                >
                <template #actions="{}">
                  <td>
                    <span>
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'MeasurementUnitView',
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
                          name: 'MeasurementUnitEdit',
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
                          name: 'ConceptDelete',
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
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "MeasurementUnitList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Measurement Unit Name",
        },
        {
          key: "description",
          label: "Description",
          filter: false,
          sorter: false,
        },
        {
          key: "abbreviation",
          label: "Abbreviation",
        },
        // {
        //   key: "version",
        //   filter: false,
        //   sorter: false,
        // },
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
    ...mapGetters("measurementUnit", ["measurementUnits"]),
  },
  created() {
    this.$store.dispatch("measurementUnit/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
