<template>
  <CCard v-if="processQualities.length">
    <CCardBody>
      <CCardTitle>
        <span>{{ $t("referential.process_quality") }}</span>
      </CCardTitle>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="processQuality of processQualities"
          :key="processQuality.id"
        >
          <CCard>
            <CCardHeader component="h6">
              <span>{{ processQuality.name }}</span>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <span>{{ processQuality.description }}</span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "ProcessDocumentationQualityView",
  props: {
    processQualities: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
