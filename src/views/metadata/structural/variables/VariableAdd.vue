<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>
              <strong>{{ $t("structural.variables_title") }}</strong>
            </span>
          </CCardTitle>
          <CCardText>
            <CForm class="mb-3">
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}*</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.name.$error }"
                :placeholder="$t('structural.variable_name')"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error">
                {{ $t("structural.validations.variable_name") }}
              </span>
            </CForm>
            <CForm class="mb-3">
              <CFormLabel for="description">
                <span>{{ $t("structural.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.description.$error }"
                :placeholder="$t('structural.variable_description')"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error">
                {{ $t("structural.validations.variable_description") }}
              </span>
            </CForm>
            <CForm class="mb-3">
              <CFormLabel for="definition">
                <span>{{ $t("structural.definition") }}</span>
              </CFormLabel>
              <input
                id="definition"
                type="text"
                class="form-control"
                :placeholder="$t('structural.variable_definition')"
                v-model.trim="definition"
              />
            </CForm>
            <CForm v-if="unitTypes">
              <CFormLabel for="measures">
                <span>{{ $t("structural.measures") }}*</span>
              </CFormLabel>
              <v-select
                label="name"
                :options="unitTypes"
                v-model="measures"
                :class="{ 'is-invalid': v$.measures.$error }"
                :placeholder="$t('structural.selection.unit_type')"
              ></v-select>
              <span class="text-danger" v-if="v$.measures.$error">
                {{ $t("structural.validations.unit_type") }}
              </span>
            </CForm>
            <CForm class="mb-3">
              <CFormLabel for="localId">
                <span>{{ $t("structural.local_ID") }}*</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control capitalize"
                :class="{ 'is-invalid': v$.localId.$error }"
                :placeholder="$t('structural.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error">
                <span>{{ $t("structural.validations.local_ID") }}</span>
              </span>
            </CForm>
            <div class="form-mandatory">
              <span>*{{ $t("structural.mandatory_fields") }}</span>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("structural.save") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("structural.reset") }}</span>
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
import { Context } from "@/common";
//import { Variable } from "@/common";

export default {
  name: "VariableAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      definition: "",
      localId: "",
      disabled: false,
      measures: "",
      //variable: []
    };
  },

  computed: {
    ...mapGetters("unitType", ["unitTypes"]),
  },

  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    localId: {
      required,
    },
    measures: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const jsonVariable = {
          name: this.name,
          description: this.description,
          definition: this.definition,
          localId: this.localId.toUpperCase(),
          measuresId: this.measures ? this.measures.id : "",
        };
        this.$store.dispatch("variable/save", jsonVariable);
        console.log(jsonVariable);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.definition = "";
      this.localId = "";
      this.meausures = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("unitType/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
