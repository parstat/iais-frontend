<template>
  <CCard v-if="processInputSpecifications.length">
    <CCardBody>
      <CCardTitle> Process Inputs </CCardTitle>
      <CCardText>
        <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
          <CCol
            xs
            v-for="processInputSpecification of processInputSpecifications"
            :key="processInputSpecification.id"
          >
            <CCard>
              <CCardHeader component="h6">
                {{ processInputSpecification.name }}
              </CCardHeader>
              <CCardBody>
                <CCardText>{{
                  processInputSpecification.description
                }}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "ProcessInputView",
  props: {
    processInputSpecifications: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
