<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
        <CCardTitle>
          Business service
        </CCardTitle>
          </CCol>
          <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/service/add"
              class="text-decoration-none text-primary"
            >
              <CIcon name="cil-plus" />
              <span class="icon-span">New business service (Software)</span>
            </router-link>
            </CNavItem>
          </CNav>
          </CCol>
          </CRow>
        <CCardText>
          <div class="table-responsive">
            <CSmartTable
          :items="businessServices"
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
                    name: 'BusinessServiceView',
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
                    name: 'BusinessServiceEdit',
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
                    name: 'BusinessServiceDelete',
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
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "BusinessServiceList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Name",
        },
         {
          key: "actions",
          label: "Actions",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },

      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("businessService", ["businessServices"]),
  },
  created() {
    this.$store.dispatch("businessService/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
