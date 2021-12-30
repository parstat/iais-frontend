<template>
  <CCard v-if="legislativeReferences.length">
    <CCardHeader class="bg-white" component="h5">
      Legislative References
    </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="legislativeReference of legislativeReferences"
          :key="legislativeReference.id"
        >
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol class="col-9">
                  <CCardTitle component="h6">
                    {{ legislativeReference.name }}
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
                    <CNavItem>
                      <span>
                        <router-link
                          tag="a"
                          :to="{
                            name: 'LegislativeReferenceView',
                            params: { id: legislativeReference.id },
                          }"
                        >
                          <CIcon name="cil-magnifying-glass" />
                        </router-link>
                      </span>
                    </CNavItem>
                  </CNav>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>{{ legislativeReference.description }}</CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "LegislativeReferencesView",
  props: {
    legislativeReferences: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
<style scoped></style>
