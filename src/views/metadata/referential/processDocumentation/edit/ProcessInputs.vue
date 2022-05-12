<template>
  <CCard>
    <CCardBody>
      <CCardTitle>
        <CIcon name="cil-description" />
        <span>&nbsp;{{ $t("referential.process_inputs") }}</span>
      </CCardTitle>
      <CCardText>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("referential.process_input_name") }}*</span>
          </CFormLabel>
          <input
            id="input_name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.name.$error }"
            :placeholder="$t('referential.process_input_name')"
            v-model.trim="name"
          />
          <CFormLabel for="description">
            <span>{{ $t("referential.process_input_description") }}*</span>
          </CFormLabel>
          <textarea
            rows="5"
            id="input_description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.description.$error }"
            :placeholder="$t('referential.process_input_description')"
            v-model.trim="description"
          />
          <div>
            <CButton
              color="primary"
              size="sm"
              style="margin-right: 0.3rem"
              @click="handleSave"
              ><span v-if="isEdit">{{ $t("referential.update") }}</span>
              <span v-else> {{ $t("referential.add") }}</span>
            </CButton>
          </div>
        </CForm>
        <CRow>
          <CCol
            class="col-md-4 mb-3"
            v-for="processInput of processDocumentation.processInputSpecifications"
            :key="processInput.id"
            ><CCard class="card card-border bg-lighter mt-3 mb-3 mr-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle component="h6">
                      <span>{{ processInput.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span v-on:click="editProcessInput(processInput)">
                          <CIcon name="cil-pencil" />
                        </span>
                      </CNavItem>
                      <CNavItem>
                        <span v-on:click="removeProcessInput(processInput)">
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ processInput.description }}</span>
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
  name: "ProcessDocumentationInputsEdit",

  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      inputId: "",
      disabled: false,
      isEdit: false,
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
    editProcessInput(selectedProcessInput) {
      this.isEdit = true;
      this.name = selectedProcessInput.name;
      this.description = selectedProcessInput.description;
      this.inputId = selectedProcessInput.id;
    },
    handleSave() {
      if (this.isEdit) {
        this.updateProcessInput();
      } else {
        this.addProcessInput();
      }
    },
    addProcessInput() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description,
        };
        this.$store
          .dispatch("processDocumentation/addProcessInput", formData)
          .then(() => {
            (this.inputId = ""), (this.name = "");
            this.description = "";
            this.v$.$reset();
          });
      }
    },
    updateProcessInput() {
      this.disabled = true; //disable buttons
      const formData = {
        id: this.inputId,
        documentation: this.processDocumentation.id,
        name: this.name,
        description: this.description,
      };
      this.$store
        .dispatch("processDocumentation/editProcessInput", formData)
        .then(() => {
          this.inputId = "";
          this.name = "";
          this.description = "";
          this.v$.$reset();
        });
    },
    removeProcessInput(selectedProcessInput) {
      const formData = {
        documentation: this.processDocumentation.id,
        input: selectedProcessInput.id,
      };
      this.$store.dispatch("processDocumentation/removeProcessInput", formData);
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
