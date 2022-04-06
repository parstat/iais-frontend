<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">
            <span>401</span>
          </h1>
          <h4 class="pt-3">
            <span>{{ $t("error.401") }}</span>
          </h4>
          <p class="text-muted">
            <span>{{ $t("user.unauthorized") }}</span>
          </p>
        </div>
        <div class="clearfix mt-3">
          <router-link tag="a" to="/">
            <CIcon name="cilHome" />
            <span>&nbsp;{{ $t("common.goto_home") }}</span>
          </router-link>
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: "unauthorizedError",
};
</script>
