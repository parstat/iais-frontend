<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white">
          <CRow>
            <CCol class="col-9">
              <CCardTitle component="h5">
                <CIcon name="cil-description" />
                <span>&nbsp;{{ $t("referential.process_documentation") }}</span>
              </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <span style="padding: 0.75rem 0.4rem">
                    <router-link
                      v-if="isAuthenticated"
                      tag="a"
                      class="text-decoration-none text-primary"
                      :to="{
                        path: '/metadata/referential/documentation/add',
                        query: {
                          program: statisticalProgramId,
                          business_function: nextSubPhase,
                        },
                      }"
                    >
                      <CIcon name="cil-plus" />
                      <span>{{ $t("referential.add") }}</span>
                    </router-link>
                  </span>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <CSmartTable
              :items="sortAscDocumentations(localProcessDocumentation)"
              :columns="columns"
              column-filter
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
                        name: 'ProcessDocumentationDelete',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-trash" />
                    </router-link>
                  </span>
                  <span v-if="isAuthenticated">
                    <router-link
                      tag="a"
                      :to="{
                        name: 'ProcessDocumentationClone',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-copy" />
                    </router-link>
                  </span>
                  <span>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'ProcessDocumentationView',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </router-link>
                  </span>
                </td>
              </template>
            </CSmartTable>
          </div>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="$emit('back')"
            ><span>{{ $t("referential.back") }}</span>
          </CButton>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="$emit('next')"
            ><span>{{ $t("referential.finish") }}</span>
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
          key: "localId",
          label: this.$i18n.t("referential.ID"),
          _style: { width: "10%" },
        },
        {
          key: "name",
          label: this.$i18n.t("referential.process_name"),
          _style: { width: "40%" },
        },
        {
          key: "frequency",
          label: this.$i18n.t("referential.frequency"),
          _style: { width: "20%" },
        },
        {
          key: "nextSubPhase",
          label: this.$i18n.t("referential.next"),
          _style: { width: "20%" },
        },
        {
          key: "version",
          label: this.$i18n.t("referential.version"),
          _style: { width: "5%" },
        },
        {
          key: "actions",
          label: this.$i18n.t("referential.actions"),
          _style: { width: "5%" },
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
      var nextSubPhase = "1.1"; //default the first one
      if (this.documentations) {
        if (this.documentations.length > 0) {
          nextSubPhase = this.sortDescByIdDocumentations(this.documentations)[0]
            .nextSubPhase;
        }
      }
      return nextSubPhase;
    },
    localProcessDocumentation() {
      var localProcessDocs = [];
      if (this.documentations) {
        for (var pd of this.documentations) {
          localProcessDocs.push({
            id: pd.id,
            order: pd.localId,
            localId: pd.businessFunction.localId,
            gsbpm: pd.businessFunction.name,
            name: pd.name,
            frequency: pd.frequency,
            nextSubPhase: pd.nextSubPhase ? pd.nextSubPhase : "Last Process",
            version: pd.version,
          });
        }
      }
      return localProcessDocs;
    },
  },
  methods: {
    sortAscDocumentations(arrays) {
      return _.orderBy(arrays, ["order", "version"], ["asc", "asc"]);
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
