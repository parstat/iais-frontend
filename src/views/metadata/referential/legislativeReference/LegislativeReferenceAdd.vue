<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle> Legislative reference </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                placeholder="Legislative reference name"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error"
                >Please enter a name.</span
              >
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                placeholder="Legislative reference description"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error"
                >Please enter a description</span
              >
            </CForm>
            <CForm>
              <label for="link">Link</label>
              <input
                id="link"
                type="text"
                class="form-control mb-3"
                placeholder="Regulation link"
                v-model.trim="link"
              />
            </CForm>
            <CForm>
              <label for="version">Version</label>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                placeholder="Regulation version"
                v-model.trim="version"
              />
            </CForm>
            <CForm>
              <label for="account">Type*</label>
              <v-select
                label="type"
                :options="types"
                v-model="type"
                :class="{ 'is-invalid': v$.type.$error }"
                placeholder="Select a type"
              ></v-select>
              <span class="text-danger" v-if="v$.type.$error"
                >Please select a type.</span
              >
            </CForm>
            <CForm>
              <label for="localId">Local id*</label>
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
import { Regulation } from "@/common";

export default {
  name: "LegislativeReferenceAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      type: "",
      link: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  computed: {
    types() {
      var types = [];
      for (const key of Object.keys(Regulation)) {
        types.push(Regulation[key]);
      }
      return types;
    },
  },
  validations: {
    name: {
      required,
    },
    description: {
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
          link: this.link,
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("legislativeReference/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.link = "";
      this.version = "";
      this.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
