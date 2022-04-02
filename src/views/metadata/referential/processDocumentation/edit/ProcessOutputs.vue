<template>
  <CCard>
    <CCardBody>
      <CCardTitle>
        <CIcon name="cil-description" />
        <span>&nbsp;{{ $t("referential.process_outputs") }}</span>
      </CCardTitle>
      <CCardText>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("referential.process_output_name") }}*</span>
          </CFormLabel>
          <input
            id="output_name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.name.$error }"
            :placeholder="$t('referential.process_output_name')"
            v-model.trim="name"
          />
          <span class="text-danger" v-if="v$.name.$error">
            {{ $t("referential.validations.process_output_name") }}
          </span>

          <CFormLabel for="description">
            <span>{{ $t("referential.process_output_description") }}*</span>
          </CFormLabel>
          <textarea
            rows="5"
            id="output_description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.description.$error }"
            :placeholder="$t('referential.process_output_description')"
            v-model.trim="description"
          />
          <div>
            <CButton
              color="primary"
              size="sm"
              style="margin-right: 0.3rem"
              @click="addProcessOutput"
              ><span>{{ $t("referential.add") }}</span>
            </CButton>
          </div>
        </CForm>
        <CRow>
          <CCol
            class="col-md-4 mb-3"
            v-for="processOutput of processDocumentation.processOutputSpecifications"
            :key="processOutput.id"
          >
            <CCard class="card card-border bg-lighter mt-3 mb-3 mr-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle component="h6">
                      <span>{{ processOutput.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span v-on:click="removeProcessOutput(processOutput)">
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <CCardText>
                  <span>{{ processOutput.description }}</span>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
      <CCardFooter class="bg-white">
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('back')"
          ><span>{{ $t("referential.back") }}</span>
        </CButton>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('next')"
          ><span>{{ $t("referential.next") }}</span>
        </CButton>
      </CCardFooter>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProcessDocumentationOutputsEdit",

  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    addProcessOutput() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description,
        };
        this.$store
          .dispatch("processDocumentation/addProcessOutput", formData)
          .then(() => {
            this.name = "";
            this.description = "";
            this.v$.$reset();
          });
      }
    },
    removeProcessOutput(selectedProcessOutput) {
      const formData = {
        documentation: this.processDocumentation.id,
        output: selectedProcessOutput.id,
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessOutput",
        formData
      );
    },
  },
  created() {},
};
</script>

<style scoped>
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.card-header {
  padding-top: 1rem;
}
</style>
