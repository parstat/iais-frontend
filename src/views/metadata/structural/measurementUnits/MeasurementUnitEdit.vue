<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Measurement Unit</span>
          </CCardTitle>
          <CCardText v-if="measurementUnit">
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.measurementUnit.name.$error,
                  'mb-3': !v$.measurementUnit.name.$error,
                }"
                placeholder="Measurement Unit name"
                v-model.trim="measurementUnit.name"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.measurementUnit.name.$error"
              >
                Please enter a name for the Measurement Unit.
              </div>
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control"
                placeholder="Measurement Unit description"
                v-model.trim="measurementUnit.description"
              />
            </CForm>
            <CForm>
              <label for="localId">Local id*</label>
              <input
                id="localId"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.measurementUnit.localId.$error,
                  'mb-3': !v$.measurementUnit.localId.$error,
                }"
                placeholder="Local id"
                v-model.trim="measurementUnit.localId"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.measurementUnit.localId.$error"
              >
                Please specify the local id.
              </div>
            </CForm>
            <CForm>
              <label for="abbreviation">Abbreviation</label>
              <input
                id="link"
                type="text"
                class="form-control"
                placeholder="Abbreviation"
                v-model.trim="measurementUnit.abbreviation"
              />
            </CForm>
            <CForm>
              <label for="convertionRule">Convertion Rule</label>
              <input
                id="convertionRule"
                type="text"
                class="form-control mb-3"
                placeholder="Convertion Rule"
                v-model.trim="measurementUnit.convertionRule"
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
  name: "MeasurementUnitEdit",
  computed: {
    ...mapGetters("measurementUnit", ["measurementUnit"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
    };
  },
  validations: {
    measurementUnit: {
      name: {
        required,
      },
      description: {
        required,
      },
      abbreviation: {
        required,
      },
    },
  },
  methods: {
    handleReset() {
      this.measurementUnit.name = "";
      this.measurementUnit.description = "";
      this.measurementUnit.abbreviation = "";
      this.measurementUnit.localId = "";
      this.measurementUnit.convertionRule = "";
      this.measurementUnit.isStandard = false;
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.measurementUnit.id,
          name: this.measurementUnit.name,
          description: this.measurementUnit.description,
          abbreviation: this.measurementUnit.abbreviation,
          localId: this.measurementUnit.localId,
          convertionRule: this.measurementUnit.convertionRule,
          isStandard: this.measurementUnit.isStandard,
        };
        this.$store.dispatch("measurementUnit/update", formData);
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("measurementUnit/findById", this.$route.params.id);
  },
};
</script>
