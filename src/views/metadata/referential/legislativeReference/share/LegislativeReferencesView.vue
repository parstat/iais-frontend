<template>
  <CCard v-if="legislativeReferences">
    <CCardHeader component="h5"> Legislative References </CCardHeader>
    <CCardBody>
      <CCardGroup>
        <CCard
          class="card card-border bg-lighter mb-3"
          v-for="legislativeReference of legislativeReferences"
          :key="legislativeReference.id"
        >
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
      </CCardGroup>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "LegislativeReferencessView",
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
