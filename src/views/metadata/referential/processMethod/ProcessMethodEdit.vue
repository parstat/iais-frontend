<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle>
            <span>
              <strong>{{ $t("referential.process_method") }}</strong>
            </span>
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
                :class="{ 'is-invalid': v$.processMethod.name.$error }"
                :placeholder="$t('referential.process_method_name')"
                v-model.trim="processMethod.name"
              />
              <span class="text-danger" v-if="v$.processMethod.name.$error">
                {{ $t("referential.validations.process_method_name") }}
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
                :placeholder="$t('referential.process_method_description')"
                v-model.trim="processMethod.description"
              />
              <span
                class="text-danger"
                v-if="v$.processMethod.description.$error"
              >
                {{ $t("referential.validations.process_method_description") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="processMethod.localId"
              />
              <span class="text-danger" v-if="v$.processMethod.localId.$error">
                {{ $t("referential.validations.process_method_local_ID") }}
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
