<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Legislative reference</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name*</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Legislative reference name"
              v-model.trim="name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }"
              >Please enter a name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="Legislative reference description"
              v-model.trim="description"
            />
            <span class="help-block">Please enter a description</span>
          </div>
          <div class="form-group">
            <label for="link">Link</label>
            <input
              id="link"
              type="text"
              class="form-control"
              placeholder="Regulation link"
              v-model.trim="link"
            />
            <span class="help-block">Please enter a link</span>
          </div>
          <div class="form-group">
            <label for="version">Version</label>
            <input
              id="version"
              type="text"
              class="form-control"
              placeholder="Regulation version"
              v-model.trim="version"
            />
            <span class="help-block">Please enter a version</span>
          </div>
          <div class="form-group">
            <label for="account">Type*</label>
            <v-select
              label="type"
              :options="types"
              v-model="type"
              :class="{ 'is-invalid': $v.type.$error }"
              placeholder="Select a type"
            ></v-select>
            <span class="help-block" :class="{ show: $v.type.$error }"
              >Please select a type.</span
            >
          </div>
          <div class="form-group">
            <label for="localId">Local id*</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.localId.$error }"
              placeholder="Local id"
              v-model.trim="localId"
            />
            <span class="help-block" :class="{ show: $v.localId.$error }"
              >Please specify a local id.</span
            >
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
import { Regulation } from "@/common";

export default {
  name: "LegislativeReferenceAdd",
  data() {
    return {
      name: "",
      description: "",
      type: "",
      link: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  computed: {
    types() {
      var types = [];
      for (const key of Object.keys(Regulation)) {
        types.push(Regulation[key]);
      }
      return types;
    },
  },
  validations: {
    name: {
      required,
    },
    type: {
      required,
    },
    localId: {
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
          type: this.type,
          link: this.link,
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("legislativeReference/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.link = "";
      this.version = "";
      this.localId = "";
      this.$v.$reset();
    },
  },
};
</script>
