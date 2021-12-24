<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardHeader>
          <CIcon name="cil-description" />
          <strong class="icon-header">Process documentation </strong>
          <CNav variant="pills" class="card-header-pills">
            <CNavItem>
              <span style="padding: 0.75rem 0.4rem">
                <router-link
                  v-if="isAuthenticated"
                  tag="a"
                  :to="{
                    path: '/metadata/referential/documentation/add',
                    query: {
                      program: statisticalProgramId,
                      business_function: nextSubPhase,
                    },
                  }"
                  class="card-header-action"
                >
                  <CIcon name="cil-plus" /> Add
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CSmartTable
            :items="sortAscDocumentations(documentations)"
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
                <span v-if="isAuthenticated">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'ProcessDocumentationEdit',
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
                      name: 'ProcessDocumentationEdit',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-trash" />
                  </router-link>
                </span>
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'ProcessDocumentationEdit',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </router-link>
                </span>
              </td>
            </template>
          </CSmartTable>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="$emit('back')"
          >
            Back
          </CButton>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="$emit('next')"
          >
            Finish
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ProcessDocumentationsEdit",
  props: ["statisticalProgramName", "statisticalProgramId", "documentations"],
  data() {
    return {
      columns: [
        {
          key: "id",
          label: "Id",
        },
        {
          key: "name",
          label: "Process name",
        },
        {
          key: "frequency",
          label: "Frequency",
        },
        {
          key: "Next",
          label: "nextSubPhase",
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
    ...mapGetters("coreui", ["isLoading"]),
    nextSubPhase() {
      var nextSubPhase = "";
      if (this.documentations) {
        nextSubPhase = this.sortDescByIdDocumentations(this.documentations)[0]
          .nextSubPhase;
      }
      return nextSubPhase;
    },
  },
  methods: {
    sortAscDocumentations(arrays) {
      return _.orderBy(arrays, "businessFunction.localId", "asc");
    },
    sortDescByIdDocumentations(arrays) {
      return _.orderBy(arrays, "id", "desc");
    },
  },
};
</script>

<style scoped>
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
