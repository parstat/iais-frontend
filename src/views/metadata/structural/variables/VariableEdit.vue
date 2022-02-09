<template>
  <CRow v-if="variable">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <strong>Variable</strong>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.name.$error }"
                placeholder="Variable name"
                v-model.trim="variable.name"
              />
              <span class="text-danger" v-if="v$.variable.name.$error"
                >Please enter variable name.</span
              >
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.description.$error }"
                placeholder="Variable description"
                v-model.trim="variable.description"
              />
              <span class="text-danger" v-if="v$.variable.description.$error">
                Please enter a variable description</span
              >
            </CForm>

            <CForm>
              <label for="localId">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.localId.$error }"
                placeholder="Local id"
                v-model.trim="variable.localId"
              />
              <span class="text-danger" v-if="v$.variable.localId.$error">
                Please enter a variable local id</span
              >
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Update</CButton
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

export default {
  name: "VariableEdit",
  computed: {
    ...mapGetters("variable", ["variable"]),
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  validations: {
    variable: {
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
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.variable.id,
          name: this.variable.name,
          description: this.variable.description,
          //definition: this.variable.definition,
          localId: this.variable.localId,
        };
        this.$store.dispatch("variable/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.variable.name = "";
      this.variable.description = "";
      //this.variable.definition = "";
      this.variable.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  },
};
</script>
