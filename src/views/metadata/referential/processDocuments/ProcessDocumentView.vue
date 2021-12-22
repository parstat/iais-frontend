<template>
  <CCard v-if="documents.length">
    <CCardHeader component="h5"> Comments/Notes </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol xs v-for="processDocument of documents" :key="processDocument.id">
          <CCard>
            <CCardHeader component="h6">
              {{ processDocument.name }}
            </CCardHeader>
            <CCardBody>
              <CCardText>{{ processDocument.description }}</CCardText>
              <CCardLink
                v-if="processDocument.externalLink"
                :href="processDocument.externalLink"
                >Link...</CCardLink
              >
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <router-link
        tag="a"
        class="btn btn-primary btn-sm btn-square"
        :to="{
          name: 'StatisticalProgramView',
          params: { id: statisticalProgramId },
        }"
      >
        Back
      </router-link>
    </CCardFooter>
  </CCard>
</template>
<script>
export default {
  name: "ProcessDocumentView",
  props: {
    documents: {
      type: Array,
      required: true,
      default: () => [],
    },
    statisticalProgramId: {
      type: Number,
      required: true,
    },
  },
};
</script>
