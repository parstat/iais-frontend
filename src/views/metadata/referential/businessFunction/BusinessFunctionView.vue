<template>
  <CRow v-if="businessFunction">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <strong>{{ businessFunction.name }}</strong>
          </CCardTitle>
          <CCardText>
            <div class="card-group">
              <span><strong>Description:</strong></span>
            </div>
            <div class="text-muted">
              <span>{{ businessFunction.description }}</span>
            </div>
            <div class="card-group">
              <span><strong>Phase:</strong></span>
            </div>
            <div class="text-muted">
              <span>{{ businessFunction.phase }}</span>
            </div>
            <div class="card-group">
              <span><strong>Sub-phase number:</strong></span>
            </div>
            <div class="text-muted">
              <span>{{ businessFunction.localId }}</span>
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
  name: "BusinessFunctionView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/function");
    },
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
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
