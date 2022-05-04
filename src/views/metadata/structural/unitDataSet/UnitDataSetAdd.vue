<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Unit data sets</span>
          </CCardTitle>
          <CCardText>
            <app-unit-data-set-form-component></app-unit-data-set-form-component>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import UnitDataSetForm from "./shared/UnitDataSetForm.vue";

export default {
  name: "UnitDataSetAdd",
  components: {
    "app-unit-data-set-form-component": UnitDataSetForm,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
