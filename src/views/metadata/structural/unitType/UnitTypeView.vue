<template>
  <CRow v-if="unitType">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ unitType.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <div class="card-group">
                <span><strong>Description:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ unitType.description }}</span>
              </div>
              <div class="card-group">
                <span><strong>Definition:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ unitType.definition }}</span>
              </div>
              <div class="card-group">
                <span><strong>Version: </strong></span>
              </div>
              <div class="text-muted">
                <span>{{ unitType.version }}</span>
              </div>
              <div class="card-group">
                <span><strong>Local id</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ unitType.localId }}</span>
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
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UnitTypeView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("unitType", ["unitType"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/unitTypes");
    },
  },
  created() {
    this.$store.dispatch("unitType/findById", this.$route.params.id);
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
