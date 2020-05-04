<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Statistical process</strong>
        </header>
        <div class="card-body">
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
            <label for="responsible">Responsible name</label>
            <input
              id="responsibleName"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.responsibleName.$error }"
              placeholder="Survey responsible"
              v-model.trim="responsibleName"
            />
            <span
              class="help-block"
              :class="{ show: $v.responsibleName.$error }"
            >
              Please enter responsible name.
            </span>
          </div>
          <div class="form-group">
            <label for="responsible">Responsible division</label>
            <input
              id="responsibleDivision"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.responsibleDivision.$error }"
              placeholder="Responsible division"
              v-model.trim="responsibleDivision"
            />
            <span
              class="help-block"
              :class="{ show: $v.responsibleDivision.$error }"
            >
              Please enter responsible division.
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
      name: "",
      acronym: "",
      responsibleName: "",
      responsibleDivision: "",
      disabled: false
    };
  },
  validations: {
    name: {
      required
    },
    acronym: {
      required
    },
    responsibleName: {
      required
    },
    responsibleDivision: {
      required
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          acronym: this.acronym,
          responsibleName: this.responsibleName,
          responsibleDivision: this.responsibleDivision
        };
        this.$store.dispatch("saveStatisticalProcess", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.acronym = "";
      this.responsibleName = "";
      this.responsibleDivision = "";
      this.$v.$reset();
    }
  }
};
</script>
<style scoped>
.form-group {
  margin-bottom: 0.2rem;
}
</style>
