<template>
  <CCard v-if="processOutputSpecifications.length">
    <CCardBody>
      <CCardTitle>
        <span>{{ $t("referential.process_outputs") }}</span>
      </CCardTitle>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="processOutputSpecification of processOutputSpecifications"
          :key="processOutputSpecification.id"
          ><CCard>
            <CCardHeader component="h6">
              <span>{{ processOutputSpecification.name }}</span>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <span>{{ processOutputSpecification.description }}</span>
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
