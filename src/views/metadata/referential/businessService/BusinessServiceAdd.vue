<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.business_service_software") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.name") }}*</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                :placeholder="$t('referential.business_service_name')"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error">
                {{ $t("referential.validations.business_service_name") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.description.$error }"
                :placeholder="$t('referential.business_service_description')"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error">
                {{ $t("referential.validations.business_service_description") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="version">
                <span>{{ $t("referential.version") }}</span>
              </CFormLabel>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.business_service_version')"
                v-model.trim="version"
              />
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.localId.$error }"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error">
                {{ $t("referential.validations.business_service_local_ID") }}
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
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.save") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("referential.reset") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "BusinessServiceAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  validations: {
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
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("businessService/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.version = "";
      this.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
