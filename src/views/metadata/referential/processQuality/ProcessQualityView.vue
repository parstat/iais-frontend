<template>
  <CCard v-if="processQualities.length">
    <CCardHeader component="h5"> Process Quality </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="processQuality of processQualities"
          :key="processQuality.id"
        >
          <CCard>
            <CCardHeader component="h6">
              {{ processQuality.name }}
            </CCardHeader>
            <CCardBody>
              <CCardText>{{ processQuality.description }}</CCardText>
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
