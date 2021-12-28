<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="businessService">
        <CCardBody>
          <CCardTitle> Business Service </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.businessService.name.$error }"
                placeholder="businessService name"
                v-model.trim="businessService.name"
              />
              <span class="text-danger" v-if="v$.businessService.name.$error"
                >Please enter businessService name.</span
              >
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.businessService.description.$error }"
                placeholder="businessService description"
                v-model.trim="businessService.description"
              />
              <span
                class="text-danger"
                v-if="v$.businessService.description.$error"
              >
                Please enter a business service description</span
              >
            </CForm>
            <CForm>
              <label for="localId">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.businessService.localId.$error }"
                placeholder="Local id"
                v-model.trim="businessService.localId"
              />
              <span
                class="text-danger"
                v-if="v$.businessService.localId.$error"
              >
                Please enter a business service local id</span
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
  name: "BusinessServiceEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"]),
  },
  validations: {
    businessService: {
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
          id: this.businessService.id,
          name: this.businessService.name,
          description: this.businessService.description,
          version: this.businessService.version,
          localId: this.businessService.localId,
        };
        this.$store.dispatch("businessService/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.businessService.name = "";
      this.businessService.description = "";
      this.businessService.version = "";
      this.businessService.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  },
};
</script>
