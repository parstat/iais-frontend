<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Process Inputs</strong>
    </header>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Process input name*</label>
        <input
          id="input_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.name.$error }"
          placeholder="Process input name"
          v-model.trim="name"
        />
        <span class="help-block" :class="{ show: $v.name.$error }"
          >Please enter a process input name.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Process input description*</label>
        <textarea
          rows="5"
          id="input_description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.description.$error }"
          placeholder="Process input description"
          v-model.trim="description"
        />
        <span class="help-block" :class="{ show: $v.description.$error }"
          >Please enter survey description.</span
        >

        <CButton
          color="primary"
          shape="square"
          size="sm"
          style="margin-right:0.3rem"
          @click="addProcessInput"
        >
          Add
        </CButton>
      </div>
      <div
        class="card-slot"
        v-for="processInput of processDocumentation.processInputSpecifications"
        :key="processInput.id"
      >
        <p class="heading">
          {{ processInput.name }}
          <span v-on:click="removeProcessInput(processInput)">
            <delete-icon />
          </span>
        </p>
        <p class="card-text">{{ processInput.description }}</p>
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
  name: "ProcessDocumentationInputsEdit",

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
    addProcessInput() {
      const formData = {
        documentation: this.processDocumentation.id,
        name: this.name,
        description: this.description
      };
      this.$store.dispatch("processDocumentation/addProcessInput", formData);
    },
    removeProcessInput(selectedProcessInput) {
      const formData = {
        documentation: this.processDocumentation.id,
        input: selectedProcessInput.id
      };
      this.$store.dispatch("processDocumentation/removeProcessInput", formData);
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
</style>
