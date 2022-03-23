<template>
  <CCRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Concept</span>
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
                placeholder="Concept name"
                v-model.trim="name"
              />
              <div class="text-danger mb-3" v-if="v$.name.$error">
                Please enter a name for the concept.
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
                placeholder="Concept description"
                v-model.trim="description"
              />
              <div class="text-danger mb-3" v-if="v$.description.$error">
                Please enter a description.
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
            <CForm>
              <label for="localId">Link</label>
              <input
                id="link"
                type="text"
                class="form-control"
                placeholder="Link"
                v-model.trim="link"
              />
            </CForm>
            <CForm>
              <label for="definition">Definition</label>
              <input
                id="definition"
                type="text"
                class="form-control mb-3"
                placeholder="Concept definition"
                v-model.trim="definition"
              />
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
  name: "ConceptAdd",
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      name: "",
      description: "",
      definition: "",
      localId: "",
      link: "",
    };
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
  },
  methods: {
    handleReset() {
      this.name = "";
      this.description = "";
      this.definition = "";
      this.localId = "";
      this.link = "";
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
          link: this.link,
        };
        this.$store.dispatch("concept/save", formData);
        console.log(formData);
      }
    },
  },
  created() {},
};
</script>
