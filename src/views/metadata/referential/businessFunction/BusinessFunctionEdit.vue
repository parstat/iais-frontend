<template>
  <CRow v-if="businessFunction">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
        <CCardTitle>
          Business Function
        </CCardTitle>
        <CCardText>
          <CForm>
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control mb-3"
              :class="{ 'is-invalid': v$.businessFunction.name.$error }"
              placeholder="businessFunction name"
              v-model.trim="businessFunction.name"
            />
            <span class="text-danger" v-if="v$.businessFunction.name.$error"
              >Please enter businessFunction name.</span
            >
          </CForm>
          <CForm>
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control mb-3"
              :class="{ 'is-invalid': v$.businessFunction.description.$error }"
              placeholder="businessFunction description"
              v-model.trim="businessFunction.description"
            />
            <span
              class="text-danger"
              v-if="v$.businessFunction.description.$error"
              >Please enter businessFunction description.</span
            >
          </CForm>
          <CForm>
            <label for="localId">Local Id</label>
            <input
              id="localId"
              type="text"
              class="form-control mb-3"
              :class="{ 'is-invalid': v$.businessFunction.localId.$error }"
              placeholder="Local id"
              v-model.trim="businessFunction.localId"
            />
            <span class="text-danger" v-if="v$.businessFunction.localId.$error"
              >Please enter businessFunction local id.</span
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
  name: "BusinessFunctionEdit",
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"]),
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  validations: {
    businessFunction: {
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
          id: this.businessFunction.id,
          name: this.businessFunction.name,
          description: this.businessFunction.description,
          version: this.businessFunction.version,
          localId: this.businessFunction.localId,
        };
        this.$store.dispatch("businessFunction/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.businessFunction.name = "";
      this.businessFunction.description = "";
      this.businessFunction.version = "";
      this.businessFunction.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
  },
};
</script>
