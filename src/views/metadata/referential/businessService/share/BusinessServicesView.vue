<template>
  <CCard v-if="businessServices.length">
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.business_services_software") }}</span>
    </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="businessService of businessServices"
          :key="businessService.id"
        >
          <CCard>
            <CCardHeader component="h6">
              <CRow>
                <CCol class="col-9">
                  <CCardTitle component="h6">
                    <span>{{ businessService.name }}</span>
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
                    <CNavItem>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'BusinessServiceView',
                          params: { id: businessService.id },
                        }"
                      >
                        <CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </CNavItem>
                  </CNav>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <span>{{ businessService.description }}</span>
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
  name: "ProcessServicesView",
  props: {
    businessServices: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
