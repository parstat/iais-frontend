<template>
  <CCard v-if="documents.length">
    <CCardHeader class="bg-white" component="h6"> Comments/Notes </CCardHeader>
    <CCardBody>
      <CCardText>
        <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
          <CCol
            xs
            v-for="processDocument of documents"
            :key="processDocument.id"
          >
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
      </CCardText>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton class="btn-primary btn-sm btn-square">
        <router-link
          tag="a"
          class="text-white text-decoration-none"
          :to="{
            name: 'StatisticalProgramView',
            params: { id: statisticalProgramId },
          }"
        >
          Back
        </router-link>
      </CButton>
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
