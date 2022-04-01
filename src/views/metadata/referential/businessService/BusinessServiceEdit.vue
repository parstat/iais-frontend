<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="businessService">
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.business_service_header") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.businessService.name.$error }"
                :placeholder="$t('referential.business_service_name')"
                v-model.trim="businessService.name"
              />
              <span class="text-danger" v-if="v$.businessService.name.$error">{{
                $t("referential.validations.business_service_name")
              }}</span>
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
                :class="{ 'is-invalid': v$.businessService.description.$error }"
                :placeholder="$t('referential.business_service_description')"
                v-model.trim="businessService.description"
              />
              <span
                class="text-danger"
                v-if="v$.businessService.description.$error"
              >
                {{ $t("referential.validations.business_service_description") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.businessService.localId.$error }"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="businessService.localId"
              />
              <span
                class="text-danger"
                v-if="v$.businessService.localId.$error"
              >
                {{ $t("referential.validations.business_service_local_ID") }}
              </span>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.update") }}</span>
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
