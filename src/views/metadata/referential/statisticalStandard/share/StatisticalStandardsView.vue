<template>
  <CCard v-if="statisticalStandards.length">
    <CCardBody>
      <CCardTitle> Statistical Standards </CCardTitle>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="statisticalStandard of statisticalStandards"
          :key="statisticalStandard.id"
        >
          <CCard>
            <CCardBody>
              <CRow>
                <CCol class="col-9">
                  <CCardTitle>
                    {{ statisticalStandard.name }}
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
                    <CNavItem>
                      <span style="padding: 0.75rem 0.4rem">
                        <router-link
                          tag="a"
                          class="text-decoration-none text-primary"
                          :to="{
                            name: 'StatisticalStandardView',
                            params: { id: statisticalStandard.id },
                          }"
                        >
                          <CIcon name="cil-magnifying-glass" />
                        </router-link>
                      </span>
                    </CNavItem>
                  </CNav>
                </CCol>
              </CRow>

              <CCardText>{{ statisticalStandard.description }}</CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "StatisticalStandardsView",
  props: {
    statisticalStandards: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
