<template>
  <div class="card w-100">
    <div class="card-header">
      <h5>Process Documentations</h5>
    </div>
    <div class="card-body">
      <CDataTable
        :items="viewProcessDocumentation"
        :fields="fields"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
        :sorterValue="{ column: 'localId', asc: 'true' }"
      >
        <template #actions="{item}">
          <td style="padding: 0.75rem 0.4rem">
            <router-link
              tag="a"
              :to="{
                name: 'ProcessDocumentationView',
                params: { id: item.id }
              }"
            >
              <view-icon />
            </router-link>
          </td>
        </template>
      </CDataTable>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        shape="square"
        size="sm"
        @click.prevent="$emit('back')"
        >Back</CButton
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "ProcessDocumentationsView",
  props: ["processDocumentations"],
  data() {
    return {
      fields: [
        {
          key: "localId",
          label: "Id"
        },
        {
          key: "gsbpm",
          label: "GSBPM"
        },
        {
          key: "name"
        },
        {
          key: "frequency"
        },
        {
          key: "nextSubPhase",
          label: "next"
        },
        {
          key: "actions",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
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
          nextSubPhase: pd.nextSubPhase
        });
      }
      return localProcessDocs;
    }
  }
};
</script>

<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
