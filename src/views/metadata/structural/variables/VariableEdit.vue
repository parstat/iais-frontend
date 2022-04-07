<template>
  <CRow v-if="variable">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>
              <strong>{{ $t("structural.variables_title") }}</strong>
            </span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.name.$error }"
                :placeholder="$t('structural.variable_name')"
                v-model.trim="variable.name"
              />
              <span class="text-danger" v-if="v$.variable.name.$error">
                {{ $t("structural.validations.variable_name") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("structural.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.description.$error }"
                :placeholder="$t('structural.variable_description')"
                v-model.trim="variable.description"
              />
              <span class="text-danger" v-if="v$.variable.description.$error">
                {{ $t("structural.validations.variable_description") }}
              </span>
            </CForm>

            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("structural.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.variable.localId.$error }"
                :placeholder="$t('structural.local_ID')"
                v-model.trim="variable.localId"
              />
              <span class="text-danger" v-if="v$.variable.localId.$error">
                {{ $t("structural.validations.variable_local_ID") }}
              </span>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("structural.update") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("structural.reset") }}</span>
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
  name: "VariableEdit",
  computed: {
    ...mapGetters("variable", ["variable"]),
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  validations: {
    variable: {
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
          id: this.variable.id,
          name: this.variable.name,
          description: this.variable.description,
          //definition: this.variable.definition,
          localId: this.variable.localId,
        };
        this.$store.dispatch("variable/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.variable.name = "";
      this.variable.description = "";
      //this.variable.definition = "";
      this.variable.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  },
};
</script>
