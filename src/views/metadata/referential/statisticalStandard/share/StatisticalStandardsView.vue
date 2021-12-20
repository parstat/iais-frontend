<template>
  <CCard v-if="statisticalStandards.length">
    <CCardHeader component="h5">
      <h5>Statistical Standards</h5>
    </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
        <CCol
          xs
          v-for="statisticalStandard of statisticalStandards"
          :key="statisticalStandard.id"
        >
          <CCard>
            <CCardHeader component="h6">
              <CNav variant="pills" class="card-header-pills">
                <CNaVItem>
                  {{ statisticalStandard.name }}
                </CNaVItem>
                <CNavItem>
                  <span style="padding: 0.75rem 0.4rem">
                    <router-link
                      tag="a"
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
            </CCardHeader>
            <div class="card-body">
              <p class="card-text">{{ statisticalStandard.description }}</p>
            </div>
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
