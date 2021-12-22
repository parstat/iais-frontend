<template>
  <div class="card">
    <header class="card-header">
      <CIcon name="cil-description" />
      <strong class="icon-header">Comments/Notes</strong>
    </header>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Title*</label>
        <input
          id="document_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.name.$error }"
          placeholder="Process comment/note title"
          v-model.trim="name"
        />
        <span class="help-block" :class="{ show: v$.name.$error }"
          >Please enter a title for comment/note.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Comment/Note*</label>
        <textarea
          rows="5"
          id="document_description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.description.$error }"
          placeholder="Process comment/note"
          v-model.trim="description"
        />
        <span class="help-block" :class="{ show: v$.description.$error }"
          >Please enter note or comment.</span
        >
      </div>
      <div class="form-group">
        <label for="link">Add an external link</label>
        <input
          id="document_link"
          type="text"
          class="form-control"
          placeholder="Process document link"
          v-model.trim="link"
        />
      </div>
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

      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processDocument of processDocumentation.documents"
          :key="processDocument.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ processDocument.name }}</strong>
              <div class="card-header-actions">
                <span v-on:click="removeProcessDocument(processDocument)">
                   <CIcon name="cil-trash" />
                </span>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processDocument.description }}</p>
            <a
              class="card-link"
              v-if="processDocument.externalLink"
              :href="processDocument.externalLink"
              >Link...</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('finish')"
      >
        Finish
      </CButton>
    </div>
  </div>
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
