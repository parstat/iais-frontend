<template>
  <CCRow v-if="measurementType">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ measurementType.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <div class="card-group">
                <span><strong>Description:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementType.description }}</span>
              </div>
              <div class="card-group">
                <span><strong>Version: </strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementType.version }}</span>
              </div>
              <div class="card-group">
                <span><strong>Local id</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ measurementType.localId }}</span>
              </div>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CCRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MeasurementTypeView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("measurementType", ["measurementType"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/measurementTypes");
    },
  },
  created() {
    this.$store.dispatch("measurementType/findById", this.$route.params.id);
  },
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
