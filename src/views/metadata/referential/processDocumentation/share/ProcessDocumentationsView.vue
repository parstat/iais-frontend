<template>
  <CCard v-if="viewProcessDocumentation.length">
    <CCardHeader component="h5"> Process Documentations </CCardHeader>
    <CCardBody>
      <div class="table-responsive">
      <CSmartTable
        :items="viewProcessDocumentation"
        :columns="columns"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
        :sorterValue="{ column: 'localId', asc: 'true' }"
      >
        <template #actions="{ item }">
          <td style="padding: 0.75rem 0.4rem">
            <router-link
              tag="a"
              :to="{
                name: 'ProcessDocumentationView',
                params: { id: item.id },
              }"
            >
              <CIcon name="cil-magnifying-glass" />
            </router-link>
          </td>
        </template>
      </CSmartTable>
      </div>
    </CCardBody>
    <CCardFooter>
      <CButton color="primary" size="sm" @click.prevent="$emit('back')"
        >Back</CButton
      >
    </CCardFooter>
  </CCard>
</template>
<script>
export default {
  name: "ProcessDocumentationsView",
  props: ["processDocumentations"],
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "gsbpm",
          label: "GSBPM",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "frequency",
          label: "Frequency",
        },
        {
          key: "nextSubPhase",
          label: "Next",
        },
        {
          key: "actions",
          label: "Actions",
          _style: "width:1%",
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
          localId: pd.businessFunction.localId,
          gsbpm: pd.businessFunction.name,
          name: pd.name,
          frequency: pd.frequency,
          nextSubPhase: pd.nextSubPhase,
        });
      }
      return localProcessDocs;
    },
  },
};
</script>

<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
