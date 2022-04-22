<template>
  <CCard v-if="viewProcessDocumentation.length">
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.process_documentation") }}</span>
    </CCardHeader>
    <CCardBody>
      <div class="table-responsive">
        <CSmartTable
          :items="sortAscDocumentations(viewProcessDocumentation)"
          :columns="columns"
          column-filter
          items-per-page-select
          :items-per-page="5"
          hover
          sorter
          pagination
          :sorterValue="{ column: 'localId', asc: 'true' }"
          ><template #actions="{ item }">
            <td style="padding: 0.75rem 0.4rem">
              <router-link
                tag="a"
                :to="{
                  name: 'ProcessDocumentationView',
                  params: { id: item.id },
                }"
                ><CIcon name="cil-magnifying-glass" />
              </router-link>
            </td>
          </template>
        </CSmartTable>
      </div>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton color="primary" size="sm" @click="$emit('back')">
        <span>{{ $t("referential.back") }}</span>
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import _ from "lodash";

export default {
  name: "ProcessDocumentationsView",
  props: ["processDocumentations"],
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("referential.ID"),
        },
        {
          key: "gsbpm",
          label: this.$i18n.t("referential.GSBPM"),
        },
        {
          key: "name",
          label: this.$i18n.t("referential.name"),
        },
        {
          key: "frequency",
          label: this.$i18n.t("referential.frequency"),
        },
        {
          key: "nextSubPhase",
          label: this.$i18n.t("referential.next"),
        },
        {
          key: "version",
          label: this.$i18n.t("referential.version"),
        },
        {
          key: "actions",
          label: this.$i18n.t("referential.actions"),
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  computed: {
    viewProcessDocumentation() {
      var localProcessDocs = [];
      for (var pd of this.processDocumentations) {
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
      return localProcessDocs;
    },
  },
  methods: {
    sortAscDocumentations(arrays) {
      return _.orderBy(arrays, ["order", "version"], ["asc", "asc"]);
    },
  },
};
</script>

<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
