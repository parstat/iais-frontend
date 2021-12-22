<template>
  <CCard v-if="processOutputSpecifications.length">
    <CCardHeader component="h5"> Process Outputs </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="processOutputSpecification of processOutputSpecifications"
          :key="processOutputSpecification.id"
        >
          <CCard>
            <CCardHeader component="h6">
              {{ processOutputSpecification.name }}
            </CCardHeader>
            <CCardBody>
              <CCardText>
                {{ processOutputSpecification.description }}
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
  name: "ProcessDocumentationOutputsView",
  props: {
    processOutputSpecifications: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
