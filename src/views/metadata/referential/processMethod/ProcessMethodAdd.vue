<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle> Process Method </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                placeholder="Process Method name"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error"
                >Please enter process method name.</span
              >
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.description.$error }"
                placeholder="Process method description"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error"
                >Please enter a description</span
              >
            </CForm>
            <div class="form-group">
              <label for="version">Version</label>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                placeholder="Process method version"
                v-model.trim="version"
              />
              <span class="help-block">Please enter a version</span>
            </div>
            <CForm>
              <label for="localId">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
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
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProcessMethodAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  validations: {
    name: {
      required,
    },
    localId: {
      required,
    },
    description: {
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
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("processMethod/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.version = "";
      this.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
