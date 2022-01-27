<template>
  <CCard v-if="legislativeReferences.length">
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle> Legislative references </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                v-if="isAuthenticated"
                tag="a"
                to="/metadata/referential/gsim/regulation/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" />
                <span class="icon-span">New regulation</span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <div class="table-responsive">
          <CSmartTable
            :items="legislativeReferences"
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
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'LegislativeReferenceView',
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
                      name: 'LegislativeReferenceEdit',
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
                      name: 'LegislativeReferenceDelete',
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
  name: "LegislativeReferenceList",
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
    ...mapGetters("legislativeReference", ["legislativeReferences"]),
  },
  created() {
    this.$store.dispatch("legislativeReference/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
