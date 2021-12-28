<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle> Statistical standard </CCardTitle>
        </CCol>

        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                v-if="isAuthenticated"
                tag="a"
                to="/metadata/referential/gsim/standard/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" />
                <span class="icon-span">New standard</span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CSmartTable
        :items="statisticalStandards"
        :columns="columns"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
        ><template #actions="{ item }">
          <td>
            <span v-if="isAuthenticated">
              <router-link
                tag="a"
                :to="{
                  name: 'StatisticalStandardEdit',
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
                  name: 'StatisticalStandardView',
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
                  name: 'StatisticalStandardDelete',
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
  name: "StatisticalStandardList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Local Id",
        },
        {
          key: "name",
          label: "Name",
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
    ...mapGetters("statisticalStandard", ["statisticalStandards"]),
  },
  created() {
    this.$store.dispatch("statisticalStandard/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
