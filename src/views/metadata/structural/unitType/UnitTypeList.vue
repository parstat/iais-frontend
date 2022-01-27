<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="unitTypes.length">
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle> Unit Types </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/unitTypes/add"
                    class="text-decoration-none text-primary"
                  >
                    <CIcon name="cil-plus" />
                    <span class="icon-span">New Unit Type</span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
          <CCardText>
            <div class="table-responsive">
              <CSmartTable
                :items="unitTypes"
                :activePage="1"
                header
                :columns="columns"
                columnFilter
                tableFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                :sorterValue="{ column: 'localId', state: 'asc' }"
                pagination
              >
                <template #actions="{ item }">
                  <td
                    style="text-align: right; width: 10%; padding-right: 20px"
                  >
                    <span class="pl-2">
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'UnitTypeView',
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
                      <!--  <router-link
                        tag="a"
                        title="Edit"
                        :to="{
                          name: 'UnitTypeEdit',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-pencil" />
                      </router-link> -->
                    </span>

                    <span
                      v-if="isAuthenticated && isAdmin"
                      class="pl-2"
                      v-c-tooltip="'Delete'"
                    >
                      <!-- <router-link
                        tag="a"
                        title="Delete"
                        :to="{
                          name: 'UnitTypeDelete',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-trash" />
                      </router-link> -->
                    </span>
                  </td>
                </template>
              </CSmartTable>
            </div>
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
  name: "UnitTypeList",
  data() {
    return {
      columns: [
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
