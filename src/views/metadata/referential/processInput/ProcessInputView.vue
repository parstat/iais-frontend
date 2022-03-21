<template>
  <CCard v-if="processInputSpecifications.length">
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.process_inputs") }}</span>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
          <CCol
            xs
            v-for="processInputSpecification of processInputSpecifications"
            :key="processInputSpecification.id"
          >
            <CCard>
              <CCardHeader component="h6">
                <span>{{ processInputSpecification.name }}</span>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ processInputSpecification.description }}</span>
                </CCardText>
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
