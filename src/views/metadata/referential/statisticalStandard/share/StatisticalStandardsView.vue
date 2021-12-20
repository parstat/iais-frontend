<template>
  <CCard v-if="statisticalStandards.length">
    <CCardHeader component="h5">
      <h5>Statistical Standards</h5>
    </CCardHeader>
    <CCardBody>
      <CCardGroup>
        <CCard
          v-for="statisticalStandard of statisticalStandards"
          :key="statisticalStandard.id"
        >
          <CCardHeader component="h6">
            {{ statisticalStandard.name }}
            <CNav variant="pills" class="card-header-pills">
              <CNavItem>
              <router-link
                tag="a"
                :to="{
                  name: 'StatisticalStandardView',
                  params: { id: statisticalStandard.id },
                }"
              >
                 <CIcon name="cil-magnifying-glass" />
              </router-link>
              </CNavItem>
            </CNav>
          </CCardHeader>
          <div class="card-body">
            <p class="card-text">{{ statisticalStandard.description }}</p>
          </div>
        </CCard>
      </CCardGroup>
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
