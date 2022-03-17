<template>
  <CCard v-if="processMethods.length">
    <CCardHeader class="bg-white" component="h5">
      <span>{{ $t("referential.process_method_header") }}</span>
    </CCardHeader>
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol
          xs
          v-for="processMethod of processMethods"
          :key="processMethod.id"
        >
          <CCard>
            <CCardHeader component="h6">
              <CRow>
                <CCol class="col-9">
                  <CCardTitle component="h6">
                    <span>{{ processMethod.name }}</span>
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
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
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <span>{{ processMethod.description }}</span>
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
