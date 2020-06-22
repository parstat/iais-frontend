<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Process Outputs</strong>
    </header>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Process output name*</label>
        <input
          id="output_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.name.$error }"
          placeholder="Process output name"
          v-model.trim="name"
        />
        <span class="help-block" :class="{ show: $v.name.$error }"
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
          :class="{ 'is-invalid': $v.description.$error }"
          placeholder="Process output description"
          v-model.trim="description"
        />
        <span class="help-block" :class="{ show: $v.description.$error }"
          >Please enter the process output description.</span
        >
        <div>
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right:0.3rem"
            @click="addProcessOutput"
          >
            Add
          </CButton>
        </div>
      </div>
      <div class="card-columns">
        <div
          class="card bg-light mb-3"
          v-for="processOutput of processDocumentation.processOutputSpecifications"
          :key="processOutput.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ processOutput.name }}</strong>
              <span v-on:click="removeProcessOutput(processOutput)">
                <delete-icon />
              </span>
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
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="$emit('next')"
      >
        Next
      </CButton>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProcessDocumentationOutputsEdit",

  data() {
    return {
      name: "",
      description: "",
      disabled: false
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"])
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    addProcessOutput() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description
        };
        this.$store
          .dispatch("processDocumentation/addProcessOutput", formData)
          .then(() => {
            this.name = "";
            this.description = "";
            this.$v.$reset();
          });
      }
    },
    removeProcessOutput(selectedProcessOutput) {
      const formData = {
        documentation: this.processDocumentation.id,
        output: selectedProcessOutput.id
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessOutput",
        formData
      );
    }
  },
  created() {}
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
.card-header {
  padding-top: 0rem;
}

.card-columns {
  column-count: 2;
}
</style>
