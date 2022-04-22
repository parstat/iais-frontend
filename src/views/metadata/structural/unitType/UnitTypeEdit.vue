<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Unit type</span>
          </CCardTitle>
          <CCardText v-if="unitType">
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.unitType.name.$error,
                  'mb-3': !v$.unitType.name.$error,
                }"
                placeholder="Unit type name"
                v-model.trim="unitType.name"
              />
              <div class="text-danger mb-3" v-if="v$.unitType.name.$error">
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
                  'is-invalid': v$.unitType.description.$error,
                  'mb-3': !v$.unitType.description.$error,
                }"
                placeholder="Unit type description"
                v-model.trim="unitType.description"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.unitType.description.$error"
              >
                Please enter a description.
              </div>
            </CForm>
            <CForm>
              <label for="definition">Definition</label>
              <input
                id="definition"
                type="text"
                class="form-control mb-3"
                placeholder="Unit type definition"
                v-model.trim="unitType.definition"
              />
            </CForm>
            <CForm>
              <label for="localId">Local id*</label>
              <input
                id="localId"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.unitType.localId.$error,
                  'mb-3': !v$.unitType.localId.$error,
                }"
                placeholder="Local id"
                v-model.trim="unitType.localId"
              />
              <div class="text-danger mb-3" v-if="v$.unitType.localId.$error">
                Please specify the local id.
              </div>
            </CForm>
            <div class="form-mandatory">*Mandatory fields</div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="handleSave()"
            :disabled="disabled"
            >Update</CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click="handleReset()"
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
  name: "UnitTypeEdit",
  computed: {
    ...mapGetters("unitType", ["unitType"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
    };
  },
  validations: {
    unitType: {
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
      this.unitType.name = "";
      this.unitType.description = "";
      this.unitType.definition = "";
      this.unitType.localId = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.unitType.id,
          name: this.unitType.name,
          description: this.unitType.description,
          definition: this.unitType.definition,
          localId: this.unitType.localId,
        };
        this.$store.dispatch("unitType/update", formData);
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("unitType/findById", this.$route.params.id);
  },
};
</script>
