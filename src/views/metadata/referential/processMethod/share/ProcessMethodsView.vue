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
        <CCard>
          <CCardHeader component="h6">
            <CNav variant="pills" class="card-header-pills">
              <CNavItem>
            {{ processMethod.name }}
              </CNavItem>
            <CNavItem>
              <span>
              <router-link
                tag="a"
                :to="{
                  name: 'ProcessMethodView',
                  params: { id: processMethod.id },
                }"
              >
                <CIcon name="cil-magnifying-glass" />
              </router-link>
              </span>
            </CNavItem>
            </CNav>
          </CCardHeader>
          <CCardBody>
            <CCardText>{{ processMethod.description }}</CCardText>
          </CCardBody>
        </CCard>
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