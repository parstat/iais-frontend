<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle>
            <span>{{ processMethod.name }}</span>
          </CCardTitle>
          <CCardText>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.description") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ processMethod.description }}</span>
            </div>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.local_ID") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ processMethod.localId }}</span>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click="handleBack()"
            :disabled="disabled"
            ><span>{{ $t("referential.back") }}</span>
          </CButton>
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
