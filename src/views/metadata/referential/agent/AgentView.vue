<template>
  <CRow v-if="agent">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ agent.name }}</span>
          </CCardTitle>
          <CCardText>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.description") }}:</strong>
              </span>
            </div>
            <div class="card-slot">
              <span>{{ agent.description }}</span>
            </div>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.type") }}:</strong>
              </span>
            </div>
            <div class="card-slot">
              <span>{{ agent.type }}</span>
            </div>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.parent") }}:</strong>
              </span>
            </div>
            <div class="card-slot">
              <span v-if="agent.parent">{{ agent.parent.name }}</span>
              <span v-else class="pl-4">&ndash;</span>
            </div>
            <div class="card-group">
              <span>
                <strong>{{ $t("referential.local_ID") }}:</strong>
              </span>
            </div>
            <div class="card-slot">
              <span>{{ agent.localId }}</span>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            ><span>{{ $t("referential.back") }}</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AgentView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/agent");
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
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
