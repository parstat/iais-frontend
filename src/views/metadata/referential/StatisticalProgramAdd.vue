<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="localId">Survey id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.localId.$error }"
              placeholder="Survey id"
              v-model.trim="localId"
            />
            <span class="help-block" :class="{ show: $v.localId.$error }">
              Please enter survey id.
            </span>
          </div>
          <div class="form-group">
            <label for="name">Survey name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Survey name"
              v-model.trim="name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }">
              Please enter survey name.
            </span>
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym</label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.acronym.$error }"
              placeholder="Survey acronym"
              v-model.trim="acronym"
            />
            <span class="help-block" :class="{ show: $v.acronym.$error }">
              Please enter an acronym.
            </span>
          </div>
          <div class="form-group">
            <label for="description">Survey description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.description.$error }"
              placeholder="Survey description"
              v-model.trim="description"
            />
            <span class="help-block" :class="{ show: $v.description.$error }">
              Please enter survey description.
            </span>
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right:0.3rem"
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
  data() {
    return {
      localId: "",
      name: "",
      acronym: "",
      description: "",
      disabled: false
    };
  },
  validations: {
    localId: {
      required
    },
    name: {
      required
    },
    acronym: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localId,
          name: this.name,
          acronym: this.acronym,
          description: this.description
        };
        this.$store.dispatch("saveStatisticalProgram", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.localId = "";
      this.name = "";
      this.acronym = "";
      this.description = "";
      this.$v.$reset();
    }
  }
};
</script>
