<template>
  <div class="card">
    <div class="card-header">
      <CIcon name="cil-description" />
      <strong class="icon-header">Process Outputs</strong>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Process output name*</label>
        <input
          id="output_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.name.$error }"
          placeholder="Process output name"
          v-model.trim="name"
        />
        <span class="help-block" :class="{ show: v$.name.$error }"
          >Please enter a process output name.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Process output description*</label>
        <textarea
          rows="5"
          id="output_description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.description.$error }"
          placeholder="Process output description"
          v-model.trim="description"
        />
        <span class="help-block" :class="{ show: v$.description.$error }"
          >Please enter the process output description.</span
        >
        <div>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="addProcessOutput"
          >
            Add
          </CButton>
        </div>
      </div>
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processOutput of processDocumentation.processOutputSpecifications"
          :key="processOutput.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ processOutput.name }}</strong>
              <div class="card-header-actions">
                <span v-on:click="removeProcessOutput(processOutput)">
                  <CIcon name="cil-trash" />
                </span>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processOutput.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('next')"
      >
        Next
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
