<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CForm>
          <CFormLabel for="localId">
            <span
              >{{ $t("structural.statistical_classification_local_id") }}*</span
            >
          </CFormLabel>
          <input
            id="localId"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localLocalId.$error }"
            :placeholder="$t('structural.statistical_classification_local_id')"
            v-model.trim="localLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localLocalId.$error">{{
            $t("structural.validations.statistical_classification_id")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("structural.statistical_classification_name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localName.$error }"
            :placeholder="$t('structural.statistical_classification_name')"
            v-model.trim="localName"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localName.$error">{{
            $t("structural.validations.statistical_classification_name")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="version">
            <span
              >{{ $t("structural.statistical_classification_version") }}*</span
            >
          </CFormLabel>
          <input
            id="acronym"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localVersion.$error }"
            :placeholder="$t('structural.statistical_classification_version')"
            v-model.trim="localVersion"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localVersion.$error">{{
            $t("structural.validations.statistical_classification_veresion")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="description">
            <span
              >{{
                $t("structural.statistical_classification_description")
              }}*</span
            >
          </CFormLabel>
          <textarea
            rows="3"
            id="description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localDescription.$error }"
            :placeholder="
              $t('structural.statistical_classification_description')
            "
            v-model.trim="localDescription"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localDescription.$error">{{
            $t("referential.validations.statistical_classification_description")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="link">
            <span>{{ $t("structural.statistical_classification_url") }}*</span>
          </CFormLabel>
          <textarea
            rows="3"
            id="description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.localLink.$error }"
            :placeholder="$t('structural.statistical_classification_url')"
            v-model.trim="localLink"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.localLink.$error">{{
            $t("referential.validations.statistical_classification_url")
          }}</span>
        </CForm>
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
  name: "StatisticalClassificationBasic",
  props: ["localId", "name", "definition", "description", "link", "version"],

  data() {
    return {
      v$: useValidate(),
      localLocalId: this.localId,
      localName: this.name,
      localDefinition: this.definition,
      localDescription: this.description,
      localVersion: this.version,
      localLink: this.link,
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
    localVersion: {
      required,
    },
    localDescription: {
      required,
    },
    localLink: {
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
          version: this.localVersion,
          link: this.localLink,
          description: this.localDescription,
          definition: this.definition,
        };
        console.log(formData);
        this.$emit("next", formData, this.fieldChanged);
        this.fieldChanged = false;
      }
    },
  },
};
</script>
