<template>
  <CCard v-if="legislativeReferences.length">
    <CCardHeader component="h5"> Legislative References </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="legislativeReference of legislativeReferences"
          :key="legislativeReference.id"
        >
          <CCard>
            <CCardHeader component="h6">
              <CNav variant="pills" class="card-header-pills">
                <CNavItem>
                  {{ legislativeReference.name }}
                </CNavItem>
                <CNavItem>
                  <span style="padding: 0.75rem 0.4rem">
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
