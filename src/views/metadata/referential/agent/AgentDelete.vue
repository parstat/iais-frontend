<template>
  <CRow v-if="agent">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ agent.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="agent.description"
                disabled
              />
            </CForm>
            <CForm v-if="agent.account">
              <CFormLabel for="responsible">
                <span>{{ $t("referential.account") }}</span>
              </CFormLabel>
              <input
                id="account"
                type="text"
                class="form-control mb-3"
                v-model.trim="agent.account.name"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="type">
                <span>{{ $t("referential.type") }}</span>
              </CFormLabel>
              <input
                id="type"
                type="text"
                class="form-control mb-3"
                v-model.trim="agent.type"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click="handleDelete()"
            :disabled="disabled"
            ><span>{{ $t("referential.delete") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AgentDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("agent/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  },
};
</script>
