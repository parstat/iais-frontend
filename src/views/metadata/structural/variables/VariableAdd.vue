<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <strong>Variable</strong>
          </CCardTitle>
          <CCardText>
            <CForm class="mb-3">
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.name.$error }"
                placeholder="Variable name"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error"
                >Please enter variable name.</span
              >
            </CForm>
            <CForm class="mb-3">
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.description.$error }"
                placeholder="Variable description"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error"
                >Please enter a description</span
              >
            </CForm>
            <CForm class="mb-3">
              <label for="definition">Definition</label>
              <input
                id="definition"
                type="text"
                class="form-control"
                placeholder="Variable Definition"
                v-model.trim="definition"
              />
            </CForm>
            <CForm v-if="unitTypes">
              <label for="measures">Measures*</label>
              <v-select
                label="name"
                :options="unitTypes"
                v-model="measures"
                :class="{ 'is-invalid': v$.measures.$error }"
                placeholder="Select a unit type"
              ></v-select>
              <span class="help-block" :class="{ show: v$.measures.$error }"
                >Please select a unit type.</span
              >
            </CForm>
            <CForm class="mb-3">
              <label for="localId">Local id*</label>
              <input
                id="localId"
                type="text"
                class="form-control capitalize"
                :class="{ 'is-invalid': v$.localId.$error }"
                placeholder="Local id"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error"
                >Please specify a local id.</span
              >
            </CForm>
            <div class="form-mandatory">*Mandatory fields</div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Save</CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
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
