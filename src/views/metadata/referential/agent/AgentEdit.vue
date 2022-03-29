<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="agent">
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.agent") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.agent.name.$error }"
                :placeholder="$t('referential.agent_name')"
                v-model.trim="agent.name"
              />
              <span class="text-danger" v-if="v$.agent.name.$error">{{
                $t("referential.validations.agent_name")
              }}</span>
            </CForm>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.agent_description')"
                v-model.trim="agent.description"
              />
            </CForm>
            <CForm>
              <CFormLabel for="account">
                <span>{{ $t("referential.type") }}</span>
              </CFormLabel>
              <v-select
                label="type"
                :options="types"
                v-model="agent.type"
                class="mb-3"
                :class="{ 'is-invalid': v$.agent.type.$error }"
                :placeholder="$t('referential.selection.type')"
              ></v-select>
              <span class="text-danger" v-if="v$.agent.type.$error">{{
                $t("referential.validations.type")
              }}</span>
            </CForm>
            <CForm>
              <CFormLabel for="parent">
                <span>{{ $t("referential.parent") }}</span>
              </CFormLabel>
              <v-select
                label="name"
                :options="parents"
                class="mb-3"
                v-model="agent.parent"
                :placeholder="$t('referential.selection.parent')"
              ></v-select>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="agent.localId"
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.update") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("referential.reset") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Agent } from "@/common";

export default {
  name: "AgentEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  watch: {
    "agent.type": function getParents() {
      this.getParents(this.agent.type);
    },
  },
  computed: {
    ...mapGetters("agent", ["agent", "parents"]),
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    },
  },
  validations: {
    agent: {
      name: {
        required,
      },
      type: {
        required,
      },
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.agent.id,
          name: this.agent.name,
          description: this.agent.description,
          type: this.agent.type,
          parent: this.agent.parent ? this.agent.parent.id : false,
          localId: this.agent.localId,
        };
        this.$store.dispatch("agent/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.agent.name = "";
      this.agent.description = "";
      this.agent.type = "";
      this.agent.localId = "";
      this.v$.$reset();
    },
    getParents(type) {
      if (type === "DIVISION") {
        this.$store.dispatch("agent/findByType", Agent.Organization);
        return;
      }
      if (type === "INDIVIDUAL") {
        this.$store.dispatch("agent/findByType", Agent.Division);
        return;
      }
      this.$store.dispatch("agent/clearParents");
      return;
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  },
};
</script>
