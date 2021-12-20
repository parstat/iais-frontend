<template>
  <CCard v-if="businessServices">
    <CCardHeader component="h5">
      Business Services/Software
    </CCardHeader>
    <CCardBody>
      <CCardGroup>
        <CCard
          v-for="businessService of businessServices"
          :key="businessService.id"
        >
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
          <CCrdBody>
            <CCardText>{{ businessService.description }}</CCardText>
          </CCrdBody>
        </CCard>
      </CCardGroup>
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
