<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Process Quality</strong>
    </header>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Process qualtiy name*</label>
        <input
          id="quality_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.name.$error }"
          placeholder="Process quality name"
          v-model.trim="name"
        />
        <span class="help-block" :class="{ show: v$.name.$error }"
          >Please enter a process quality name.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Process quality description*</label>
        <textarea
          rows="5"
          id="quality_description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.description.$error }"
          placeholder="Process quality description"
          v-model.trim="description"
        />
        <span class="help-block" :class="{ show: v$.description.$error }"
          >Please enter the process quality description.</span
        >
        <div>
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right: 0.3rem"
            @click="addProcessQuality"
          >
            Add
          </CButton>
        </div>
      </div>
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processQuality of processDocumentation.processQualities"
          :key="processQuality.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ processQuality.name }}</strong>
              <div class="card-header-actions">
                <span v-on:click="removeProcessQuality(processQuality)">
                  <delete-icon />
                </span>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processQuality.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        shape="square"
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
    addProcessQuality() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description,
        };
        this.$store
          .dispatch("processDocumentation/addProcessQuality", formData)
          .then(() => {
            this.name = "";
            this.description = "";
            this.v$.$reset();
          });
      }
    },
    removeProcessQuality(selectedProcessQuality) {
      const formData = {
        documentation: this.processDocumentation.id,
        quality: selectedProcessQuality.id,
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessQuality",
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
