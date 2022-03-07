<template>
  <CCRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Hello</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.name.$error,
                  'mb-3': !v$.name.$error,
                }"
                placeholder="Unit type name"
                v-model.trim="name"
              />
              <div class="text-danger mb-3" v-if="v$.name.$error">
                Please enter a name for the unit type.
              </div>
            </CForm>
            <CForm>
              <label for="description">Description*</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.description.$error,
                  'mb-3': !v$.description.$error,
                }"
                placeholder="Unit type description"
                v-model.trim="description"
              />
              <div class="text-danger mb-3" v-if="v$.description.$error">
                Please enter a description.
              </div>
            </CForm>
            <CForm>
              <label for="definition">Definition*</label>
              <input
                id="definition"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.definition.$error,
                  'mb-3': !v$.definition.$error,
                }"
                placeholder="Unit type definition"
                v-model.trim="definition"
              />
              <div class="text-danger mb-3" v-if="v$.definition.$error">
                Please enter a definition.
              </div>
            </CForm>
            <CForm>
              <label for="localId">Local id*</label>
              <input
                id="localId"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.localId.$error,
                  'mb-3': !v$.localId.$error,
                }"
                placeholder="Local id"
                v-model.trim="localId"
              />
              <div class="text-danger mb-3" v-if="v$.localId.$error">
                Please specify the local id.
              </div>
            </CForm>
            <div class="form-mandatory">*Mandatory fields</div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSave()"
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
  </CCRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "UnitTypeAdd",
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      name: "",
      description: "",
      definition: "",
      localId: "",
    };
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    definition: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    handleReset() {
      this.name = "";
      this.description = "";
      this.definition = "";
      this.localId = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          definition: this.definition,
          localId: this.localId,
        };
        this.$store.dispatch("unitType/save", formData);
        console.log(formData);
      }
    },
  },
  created() {},
};
</script>
