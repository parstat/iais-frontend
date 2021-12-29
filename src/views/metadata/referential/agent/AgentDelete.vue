<template>
  <CRow v-if="agent">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
        <CCardTitle>
         {{ agent.name }}
        </CCardTitle>
        <CCardText>
          <CForm>
            <label for="description">Description</label>
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
            <label for="responsible">Account</label>
            <input
              id="account"
              type="text"
              class="form-control mb-3"
              v-model.trim="agent.account.name"
              disabled
            />
          </CForm>
          <CForm>
            <label for="type">Type</label>
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
            @click.prevent="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
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
