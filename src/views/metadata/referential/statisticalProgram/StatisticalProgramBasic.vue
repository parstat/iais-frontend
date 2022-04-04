<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CForm>
          <CFormLabel for="localId">
            <span>{{ $t("referential.survey_ID") }}*</span>
          </CFormLabel>
          <input
            id="localId"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localLocalId.$error }"
            :placeholder="$t('referential.survey_ID')"
            v-model.trim="localLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localLocalId.$error">
            {{ $t("referential.validations.survey_ID") }}
          </span>
        </CForm>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("referential.survey_name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localName.$error }"
            :placeholder="$t('referential.survey_name')"
            v-model.trim="localName"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localName.$error">
            {{ $t("referential.validations.survey_name") }}
          </span>
        </CForm>
        <CForm>
          <CFormLabel for="acronym">
            <span>{{ $t("referential.survey_acronym") }}*</span>
          </CFormLabel>
          <input
            id="acronym"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localAcronym.$error }"
            :placeholder="$t('referential.survey_acronym')"
            v-model.trim="localAcronym"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localAcronym.$error">
            {{ $t("referential.validations.survey_acronym") }}
          </span>
        </CForm>
        <CForm>
          <CFormLabel for="description">
            <span>{{ $t("referential.survey_description") }}*</span>
          </CFormLabel>
          <textarea
            rows="3"
            id="description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localDescription.$error }"
            :placeholder="$t('referential.survey_description')"
            v-model.trim="localDescription"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localDescription.$error">
            {{ $t("referential.validations.survey_description") }}
          </span>
        </CForm>
        <div class="form-mandatory">
          <span>*{{ $t("referential.mandatory_fields") }}</span>
        </div>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="next"
        ><span>{{ $t("referential.next") }}</span>
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "StatisticalProgramBasic",
  props: ["localId", "name", "acronym", "description"],
  data() {
    return {
      v$: useValidate(),
      localLocalId: this.localId,
      localName: this.name,
      localAcronym: this.acronym,
      localDescription: this.description,
      disabled: false,
      fieldChanged: false, //do nothing if nothing changes
    };
  },
  validations: {
    localLocalId: {
      required,
    },
    localName: {
      required,
    },
    localAcronym: {
      required,
    },
    localDescription: {
      required,
    },
  },
  methods: {
    next() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localLocalId,
          name: this.localName,
          acronym: this.localAcronym,
          description: this.localDescription,
        };
        console.log(formData);
        this.$emit("next", formData, this.fieldChanged);
        this.fieldChanged = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
