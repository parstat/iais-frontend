<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CRow>
          <CCol class="col-9">
            <CCardTitle>
              <span>Represented Variable</span>
            </CCardTitle>
          </CCol>
          <CCol class="col-3">
            <CNav class="justify-content-end">
              <CNavItem>
                <router-link
                  tag="a"
                  :to="{
                    name: 'VariableRepresentationsAdd',
                    params: { id: variable?.id ?? '11' },
                  }"
                  class="text-decoration-none text-primary"
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">
                    Add new Variable Representation
                  </span>
                </router-link>
              </CNavItem>
            </CNav>
          </CCol>
        </CRow>
        <CSmartTable
          v-if="variable?.representations?.length"
          :activePage="1"
          :items="variable?.representations"
          :columns="variableColumns"
          columnFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          pagination
        >
          <template #actions="{ item }">
            <span v-if="isAuthenticated" class="pl-2">
              <router-link
                tag="a"
                title="Edit"
                :to="{
                  name: 'VariableRepresentationEdit',
                  params: { id: variable.id, representationId: item.id },
                }"
              >
                <CIcon name="cil-pencil" />
              </router-link>
            </span>
            <span v-if="isAuthenticated" class="pl-2" v-c-tooltip="'Delete'">
              <router-link
                tag="a"
                title="Delete"
                :to="{
                  name: 'VariableRepresentationDelete',
                  params: { id: variable.id, representationId: item.id },
                }"
              >
                <CIcon name="cil-trash" />
              </router-link>
            </span>
          </template>
        </CSmartTable>
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VariableRepresentation",
  computed: {
    ...mapGetters("variable", ["variable"]),
  },
  data() {
    return {
      disabled: false,
      variableColumns: [
        {
          key: "localId",
          label: "Local ID",
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
      ],
    };
  },
};
</script>
