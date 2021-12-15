<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Business service (Software)</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name*</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Business service name"
              v-model.trim="name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }"
              >Please enter business service name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="Business service description"
              v-model.trim="description"
            />
            <span class="help-block">Please enter a description</span>
          </div>
          <div class="form-group">
            <label for="version">Version</label>
            <input
              id="version"
              type="text"
              class="form-control"
              placeholder="Business service version"
              v-model.trim="version"
            />
            <span class="help-block">Please enter a version</span>
          </div>
          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="localId"
            />
            <span class="help-block">Please specify the local id.</span>
          </div>
          <div class="form-mandatory">*Mandatory fields</div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Save</CButton
          >
          <CButton
            color="danger"
            shape="square"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "BusinessServiceAdd",
  data() {
    return {
      name: "",
      description: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  validations: {
    name: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("businessService/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.version = "";
      this.localId = "";
      this.$v.$reset();
    },
  },
};
</script>
