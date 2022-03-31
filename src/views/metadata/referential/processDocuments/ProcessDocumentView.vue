<template>
  <CCard v-if="documents.length">
    <CCardHeader class="bg-white" component="h6">
      <span>{{ $t("referential.comments/notes") }}</span>
    </CCardHeader>
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
                <span>{{ processDocument.name }}</span>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ processDocument.description }}</span>
                </CCardText>
                <CCardLink
                  v-if="processDocument.externalLink"
                  :href="processDocument.externalLink"
                  ><span>{{ $t("referential.link") }}&nbsp;...</span>
                </CCardLink>
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
          ><span>{{ $t("referential.back") }}</span>
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
