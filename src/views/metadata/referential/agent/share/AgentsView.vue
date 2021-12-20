<template>
  <CCard v-if="maintainers.length">
    <CCardHeader component="h5"> Maintainers </CCardHeader>
    <CCardBody class="card-body">
      <CCardGroup>
        <CCard v-for="maintainer of maintainers" :key="maintainer.id">
          <CCardHeader component="h6">
            {{ maintainer.name }}
          </CCardHeader>
          <CCardBody>
            <CCardText>{{ maintainer.description }}</CCardText>
          </CCardBody>
        </CCard>
      </CCardGroup>
    </CCardBody>
  </CCard>
  <CCard v-else>
    <CCardHeader component="h5"> Maintainers </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol xs>
          <CCard>
            <CCardHeader component="h5"> Owner </CCardHeader>
            <CCardBody>
              <div class="mb-2">
                <span><strong>Name</strong></span>
              </div>
              <div class="card-slot">
                <span>{{ owner.name }}</span>
              </div>
              <div v-if="owner.description" class="mb-2">
                <span><strong>Description</strong></span>
              </div>
              <div class="card-slot" v-if="owner.description">
                <span> {{ owner.description }}</span>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard>
            <CCardHeader component="h5"> Division </CCardHeader>
            <CCardBody>
              <div class="mb-2">
                <span><strong>Name</strong></span>
              </div>
              <div class="card-slot">
                <span>{{ maintainer.name }}</span>
              </div>
              <div v-if="maintainer.description" class="mb-2">
                <span><strong>Description</strong></span>
              </div>
              <div class="card-slot" v-if="maintainer.description">
                <span> {{ maintainer.description }}</span>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard>
            <CCardHeader component="h5"> Contact </CCardHeader>
            <CCardBody>
              <div class="mb-2">
                <span><strong>Name</strong></span>
              </div>
              <div class="card-slot">
                <span>{{ contact.name }}</span>
              </div>
              <div v-if="contact.description" class="mb-2">
                <span><strong>Description</strong></span>
              </div>
              <div class="card-slot" v-if="contact.description">
                <span> {{ contact.description }}</span>
              </div>
              <div v-if="contact.localId" class="mb-2">
                <span><strong>Email</strong></span>
              </div>
              <div class="card-slot" v-if="contact.localId">
                <span> {{ contact.localId }}</span>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "AgentsView",
  props: {
    owner: {
      type: Object,
      default: () => {},
    },
    maintainer: {
      type: Object,
      default: () => {},
    },
    contact: {
      type: Object,
      default: () => {},
    },
    maintainers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
  box-shadow: none !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.material-design-icon {
  margin-bottom: 0.2rem;
}
</style>
