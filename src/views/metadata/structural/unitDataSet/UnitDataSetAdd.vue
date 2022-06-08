<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.unit_data_sets") }}</span>
          </CCardTitle>
          <CCardText>
            <app-unit-data-set-basic-component></app-unit-data-set-basic-component>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import UnitDataSetBasic from "./shared/UnitDataSetBasic.vue";

export default {
  name: "UnitDataSetAdd",
  components: {
    "app-unit-data-set-basic-component": UnitDataSetBasic,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
