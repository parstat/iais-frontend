<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle>
            <strong>Process Method</strong>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.processMethod.name.$error }"
                placeholder="processMethod name"
                v-model.trim="processMethod.name"
              />
              <span class="text-danger" v-if="v$.processMethod.name.$error"
                >Please enter processMethod name.</span
              >
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                placeholder="processMethod description"
                v-model.trim="processMethod.description"
              />
              <span
                class="text-danger"
                v-if="v$.processMethod.description.$error"
              >
                Please enter an process method description</span
              >
            </CForm>
            <CForm>
              <label for="localId">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control"
                placeholder="Local id"
                v-model.trim="processMethod.localId"
              />
              <span class="text-danger" v-if="v$.processMethod.localId.$error">
                Please enter an process method local id</span
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
  name: "ProcessMethodEdit",
  computed: {
    ...mapGetters("processMethod", ["processMethod"]),
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  validations: {
    processMethod: {
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
          id: this.processMethod.id,
          name: this.processMethod.name,
          description: this.processMethod.description,
          version: this.processMethod.version,
          localId: this.processMethod.localId,
        };
        this.$store.dispatch("processMethod/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.processMethod.name = "";
      this.processMethod.description = "";
      this.processMethod.version = "";
      this.processMethod.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
  },
};
</script>
