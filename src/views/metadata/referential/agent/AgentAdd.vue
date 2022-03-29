<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span
              ><strong>{{ $t("referential.agent") }}</strong></span
            >
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.name") }}*</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                :placeholder="$t('referential.agent_name')"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error">{{
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
                v-model.trim="description"
              />
            </CForm>
            <CForm>
              <CFormLabel for="type">
                <span>{{ $t("referential.type") }}*</span>
              </CFormLabel>
              <v-select
                label="type"
                :options="types"
                v-model="type"
                class="mb-3"
                :class="{ 'is-invalid': v$.type.$error }"
                :placeholder="$t('referential.selection.type')"
                @input="getParents"
              ></v-select>
              <span class="text-danger" v-if="v$.type.$error">{{
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
                v-model="parent"
                :placeholder="$t('referential.selection.parent')"
              ></v-select>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}*</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.localId.$error }"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error">{{
                $t("referential.validations.local_ID")
              }}</span>
            </CForm>
            <div class="form-mandatory">
              <span>*{{ $t("referential.mandatory_fields") }}</span>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.save") }}</span>
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
  name: "AgentAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      type: "",
      parent: "",
      localId: "",
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["parents"]),
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    },
  },
  validations: {
    name: {
      required,
    },
    type: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          type: this.type,
          parent: this.parent.id,
          localId: this.localId,
        };
        this.$store.dispatch("agent/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.localId = "";
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
};
</script>
