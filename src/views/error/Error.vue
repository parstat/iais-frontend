<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">
            <span>500</span>
          </h1>
          <h4 class="pt-3">
            <span>{{ $t("error.500") }}</span>
          </h4>
          <p class="text-muted">
            <span>{{ $t("common.error_occurred") }}</span>
          </p>
        </div>
        <div class="clearfix mb-3">
          <h4 class="pt-3">{{ $t("common.error_message") }}</h4>
          <p class="text-muted">{{ msg }}</p>
        </div>
        <div class="clearfix mb-3">
          <router-link tag="a" to="/">
            <CIcon name="cilHome" />
            <span>&nbsp;{{ $t("common.goto_homepage") }}</span>
          </router-link>
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GeneralError",
  computed: {
    ...mapGetters("error", ["msg"]),
  },
};
</script>
