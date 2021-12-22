<template>
  <CCard v-if="businessServices.length">
    <CCardHeader component="h5"> Business Services/Software </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="businessService of businessServices"
          :key="businessService.id"
        >
          <CCard>
            <CCardHeader component="h6">
              {{ businessService.name }}
              <CNav variant="pills" class="card-header-pills">
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
            </CCardHeader>
            <CCardBody>
              <CCardText>{{ businessService.description }}</CCardText>
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
