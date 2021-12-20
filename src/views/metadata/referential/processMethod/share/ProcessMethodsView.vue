<template>
  <CCard v-if="processMethods.length">
    <CCardHeader component="h5"> Process Methods </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol
          xs
          v-for="processMethod of processMethods"
          :key="processMethod.id"
        >
          <div class="card-header">
            <strong>{{ processMethod.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                :to="{
                  name: 'ProcessMethodView',
                  params: { id: processMethod.id },
                }"
              >
                <view-icon />
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processMethod.description }}</p>
          </div>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "ProcessMethodsView",
  props: {
    processMethods: {
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
