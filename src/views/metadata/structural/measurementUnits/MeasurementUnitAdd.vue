<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Measurement Unit</span>
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
                placeholder="Measurement Unit name"
                v-model.trim="name"
              />
              <div class="text-danger mb-3" v-if="v$.name.$error">
                Please enter a name for the measurement unit.
              </div>
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                placeholder="Measurement Unit description"
                v-model.trim="description"
              />
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
              <label for="abbreviation">Abbreviation*</label>
              <input
                id="appreviation"
                type="text"
                class="form-control mb-3"
                placeholder="Abbreviation"
                v-model.trim="abbreviation"
              />
            </CForm>
            <CForm v-if="measurementTypes">
              <label for="measurementTypes"
                ><span>Measurement type*</span></label
              >
              <v-select
                label="name"
                :options="measurementTypes"
                :reduce="(measurementType) => measurementType.id"
                v-model="measurementTypeId"
                class="mb-3"
                :class="{ 'is-invalid': v$.measurementTypeId.$error }"
                :placeholder="'Select the type of the measurement'"
              ></v-select>
              <span class="text-danger" v-if="v$.measurementTypeId.$error"
                >Please select a measurement type</span
              >
            </CForm>
            <CForm>
              <label for="convertionRule">Convertion Rule</label>
              <input
                id="definition"
                type="text"
                class="form-control mb-3"
                placeholder="Convertion Rule"
                v-model.trim="convertionRule"
              />
            </CForm>
            <CFormSwitch
              size="lg"
              label="Is standard"
              id="formSwitchCheckDefault"
              v-model="isStandard"
            />
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
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "MeasurementUnitAdd",
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      name: "",
      description: "",
      abbreviation: "",
      localId: "",
      convertionRule: "",
      isStandard: false,
      measurementTypeId: "",
    };
  },
  computed: {
    ...mapGetters("measurementType", ["measurementTypes"]),
  },
  validations: {
    name: {
      required,
    },
    abbreviation: {
      required,
    },
    localId: {
      required,
    },
    measurementTypeId: {
      required,
    },
  },
  methods: {
    handleReset() {
      this.name = "";
      this.description = "";
      this.convertionRule = "";
      this.localId = "";
      this.abbreviation = "";
      this.isStandard = false;
      this.measurementTypeId = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      console.log(this.measurementTypeId);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          definition: this.definition,
          localId: this.localId,
          convertionRule: this.convertionRule,
          abbreviation: this.abbreviation,
          isStandard: this.isStandard,
          measurementTypeId: this.measurementTypeId,
        };
        this.$store.dispatch("measurementUnit/save", formData);
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("measurementType/findAll");
  },
};
</script>
