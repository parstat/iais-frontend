<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="businessService">
        <CCardBody>
        <CCardTitle>
          {{ businessService.name }}
        </CCardTitle>
        <CCardText>
          <div class="card-group">
            <span><strong>Description:</strong></span>
          </div>
          <div class="text-muted mb-3">
            <span>{{ businessService.description }}</span>
          </div>
          <div class="card-group">
            <span><strong>Locla id: </strong></span>
          </div>
          <div class="text-muted mb-3">
            <span>{{ businessService.localId }}</span>
          </div>
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
  name: "BusinessServiceView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/service");
    },
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
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
