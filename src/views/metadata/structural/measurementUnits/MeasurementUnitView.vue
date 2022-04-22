<template>
  <CRow v-if="measurementUnit">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ measurementUnit.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <div class="card-group">
                <span><strong>Description:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementUnit.description }}</span>
              </div>
              <div class="card-group">
                <span><strong>Abbreviation:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementUnit.abbreviation }}</span>
              </div>
              <div class="card-group">
                <span><strong>Version: </strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementUnit.version }}</span>
              </div>
              <div class="card-group">
                <span><strong>Local id</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementUnit.localId }}</span>
              </div>
              <div class="card-group">
                <span><strong>Convertion Rule</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementUnit.convertionRule }}</span>
              </div>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "MeasurementUnitView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("measurementUnit", ["measurementUnit"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/measurementUnits");
    },
  },
  created() {
    this.$store.dispatch("measurementUnit/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
