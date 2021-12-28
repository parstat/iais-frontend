<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle> Business functions </CCardTitle>
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
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">Add</span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CSmartTable
        :items="businessFunctions"
        :columns="columns"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <template #actions="{ item }">
          <td>
            <span>
              <router-link
                tag="a"
                :to="{
                  name: 'BusinessFunctionView',
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
                  name: 'BusinessFunctionEdit',
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
                  name: 'BusinessFunctionDelete',
                  params: { id: item.id },
                }"
              >
                <CIcon name="cil-trash" />
              </router-link>
            </span>
          </td>
        </template>
      </CSmartTable>
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
          label: "Id",
        },
        {
          key: "phase",
          label: "Phase",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "description",
          label: "Description",
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
    ...mapGetters("businessFunction", ["businessFunctions"]),
  },
  created() {
    this.$store.dispatch("businessFunction/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
