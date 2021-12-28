<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle>
            {{ processMethod.name }}
          </CCardTitle>
          <CCardText>
            <div class="card-group">
              <span><strong>Description: </strong></span>
            </div>
            <div class="text-muted">
              <span>{{ processMethod.description }}</span>
            </div>
            <div class="card-group">
              <span><strong>Local Id:</strong></span>
            </div>
            <div class="text-muted">
              <span> {{ processMethod.localId }}</span>
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
  name: "ProcessMethodView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processMethod", ["processMethod"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/method");
    },
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
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
