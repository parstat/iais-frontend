<template>
  <CCard>
    <CCardBody>
      <CCardTitle>
        <CIcon name="cil-description" />
        <strong> Comments/Notes</strong>
      </CCardTitle>
      <CCardText>
        <CForm>
          <label for="name">Title*</label>
          <input
            id="document_name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.name.$error }"
            placeholder="Process comment/note title"
            v-model.trim="name"
          />
          <label for="description">Comment/Note*</label>
          <textarea
            rows="5"
            id="document_description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.description.$error }"
            placeholder="Process comment/note"
            v-model.trim="description"
          />

          <label for="link">Add an external link</label>
          <input
            id="document_link"
            type="text"
            class="form-control mb-3"
            placeholder="Process document link"
            v-model.trim="link"
          />
        </CForm>
        <div>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="addProcessDocument"
          >
            Add
          </CButton>
        </div>
        <CRow>
          <CCol
            class="col-md-4 mt-3"
            v-for="processDocument of processDocumentation.documents"
            :key="processDocument.id"
          >
            <CCard class="card-border bg-lighter mb-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    {{ processDocument.name }}
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span
                          v-on:click="removeProcessDocument(processDocument)"
                        >
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CCardText>{{ processDocument.description }}</CCardText>
                <CCardLink
                  v-if="processDocument.externalLink"
                  :href="processDocument.externalLink"
                  >Link...</CCardLink
                >
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('finish')"
        >
          Finish
        </CButton>
      </CCardText>
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
      link: "",
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
    addProcessDocument() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description,
          link: this.link,
          type: this.link ? "EXTERNAL_LINK" : "TEXT_PLAIN",
        };
        this.$store
          .dispatch("processDocumentation/addProcessDocument", formData)
          .then(() => {
            this.name = "";
            this.description = "";
            this.link = "";
            this.v$.$reset();
          });
      }
    },
    removeProcessDocument(selectedProcessDocument) {
      const formData = {
        documentation: this.processDocumentation.id,
        document: selectedProcessDocument.id,
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessDocument",
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
