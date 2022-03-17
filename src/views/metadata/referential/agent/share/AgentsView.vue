<template>
  <CCard v-if="maintainers.length">
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.maintainers") }}</span>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
          <CCol xs v-for="maintainer of maintainers" :key="maintainer.id">
            <CCard>
              <CCardHeader component="h6">
                <span>{{ maintainer.name }}</span>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ maintainer.description }}</span>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
    </CCardBody>
  </CCard>
  <CCard v-else>
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.maintainers") }}</span>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
          <CCol xs v-if="owner">
            <CCard>
              <CCardHeader component="h5">
                <span>{{ $t("referential.owner") }}</span>
              </CCardHeader>
              <CCardBody>
                <div class="mb-2">
                  <span>
                    <strong>{{ $t("referential.name") }}</strong>
                  </span>
                </div>
                <div class="card-slot">
                  <span>{{ owner.name }}</span>
                </div>
                <div v-if="owner.description" class="mb-2">
                  <span>
                    <strong>{{ $t("referential.description") }}</strong>
                  </span>
                </div>
                <div class="card-slot" v-if="owner.description">
                  <span>{{ owner.description }}</span>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs v-if="maintainer">
            <CCard>
              <CCardHeader component="h5">
                <span>{{ $t("referential.division") }}</span>
              </CCardHeader>
              <CCardBody>
                <div class="mb-2">
                  <span>
                    <strong>{{ $t("referential.name") }}</strong>
                  </span>
                </div>
                <div class="card-slot">
                  <span>{{ maintainer.name }}</span>
                </div>
                <div v-if="maintainer.description" class="mb-2">
                  <span>
                    <strong>{{ $t("referential.description") }}</strong>
                  </span>
                </div>
                <div class="card-slot" v-if="maintainer.description">
                  <span>{{ maintainer.description }}</span>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs v-if="contact">
            <CCard>
              <CCardHeader component="h5">
                <span>{{ $t("referential.contact") }}</span>
              </CCardHeader>
              <CCardBody>
                <div class="mb-2">
                  <span>
                    <strong>{{ $t("referential.name") }}</strong>
                  </span>
                </div>
                <div class="card-slot">
                  <span>{{ contact.name }}</span>
                </div>
                <div v-if="contact.description" class="mb-2">
                  <span>
                    <strong>{{ $t("referential.description") }}</strong>
                  </span>
                </div>
                <div class="card-slot" v-if="contact.description">
                  <span> {{ contact.description }}</span>
                </div>
                <div v-if="contact.localId" class="mb-2">
                  <span>
                    <strong>{{ $t("referential.email") }}</strong>
                  </span>
                </div>
                <div class="card-slot" v-if="contact.localId">
                  <span>{{ contact.localId }}</span>
                </div>
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
