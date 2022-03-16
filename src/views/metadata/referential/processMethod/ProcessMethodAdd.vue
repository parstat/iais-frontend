<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.process_method") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">
                <span>{{ $t("referential.name") }}*</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                :placeholder="$t('referential.process_method_name')"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error">{{
                $t("referential.validations.process_method_name")
              }}</span>
            </CForm>
            <CForm>
              <label for="description">
                <span>{{ $t("referential.description") }}</span>
              </label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.description.$error }"
                :placeholder="$t('referential.process_method_description')"
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error">{{
                $t("referential.validations.process_method_description")
              }}</span>
            </CForm>
            <div class="form-group">
              <label for="version">
                <span>{{ $t("referential.version") }}</span>
              </label>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.process_method_version')"
                v-model.trim="version"
              />
              <span class="text-danger" v-if="v$.description.$error">{{
                $t("referential.validations.process_method_version")
              }}</span>
            </div>
            <CForm>
              <label for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.localId.$error }"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error">{{
                $t("referential.validations.process_method_local_ID")
              }}</span>
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
            ><span>{{ $t("referential.save") }}</span></CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("referential.reset") }}</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProcessMethodAdd",
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
    localId: {
      required,
    },
    description: {
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
        this.$store.dispatch("processMethod/save", formData);
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
