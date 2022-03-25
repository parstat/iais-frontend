<template>
  <CCRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Measurement type</span>
          </CCardTitle>
          <CCardText v-if="measurementType">
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.measurementType.name.$error,
                  'mb-3': !v$.measurementType.name.$error,
                }"
                placeholder="Measurement type name"
                v-model.trim="measurementType.name"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.measurementType.name.$error"
              >
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
                  'is-invalid': v$.measurementType.description.$error,
                  'mb-3': !v$.measurementType.description.$error,
                }"
                placeholder="Measurement type description"
                v-model.trim="measurementType.description"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.measurementType.description.$error"
              >
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
                  'is-invalid': v$.measurementType.localId.$error,
                  'mb-3': !v$.measurementType.localId.$error,
                }"
                placeholder="Local id"
                v-model.trim="measurementType.localId"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.measurementType.localId.$error"
              >
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
  </CCRow>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "MeasurementTypeEdit",
  computed: {
    ...mapGetters("measurementType", ["measurementType"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
    };
  },
  validations: {
    measurementType: {
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
    handleReset() {
      this.measurementType.name = "";
      this.measurementType.description = "";
      this.measurementType.localId = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.measurementType.id,
          name: this.measurementType.name,
          description: this.measurementType.description,
          localId: this.measurementType.localId,
        };
        this.$store.dispatch("measurementType/update", formData);
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("measurementType/findById", this.$route.params.id);
  },
};
</script>
