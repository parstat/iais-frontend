<template>
  <div class="card">
    <div class="card-body pt-0">
      <div class="form-group">
        <label for="localId">Survey id*</label>
        <input
          id="localId"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.localLocalId.$error }"
          placeholder="Survey id"
          v-model.trim="localLocalId"
          @change="fieldChanged = true"
        />
        <span class="help-block" :class="{ show: $v.localLocalId.$error }"
          >Please enter survey id.</span
        >
      </div>
      <div class="form-group">
        <label for="name">Survey name*</label>
        <input
          id="name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.localName.$error }"
          placeholder="Survey name"
          v-model.trim="localName"
          @change="fieldChanged = true"
        />
        <span class="help-block" :class="{ show: $v.localName.$error }"
          >Please enter survey name.</span
        >
      </div>
      <div class="form-group">
        <label for="acronym">Survey acronym*</label>
        <input
          id="acronym"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.localAcronym.$error }"
          placeholder="Survey acronym"
          v-model.trim="localAcronym"
          @change="fieldChanged = true"
        />
        <span class="help-block" :class="{ show: $v.localAcronym.$error }"
          >Please enter an acronym.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Survey description*</label>
        <textarea
          rows="3"
          id="description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.localDescription.$error }"
          placeholder="Survey description"
          v-model.trim="localDescription"
          @change="fieldChanged = true"
        />
        <span class="help-block" :class="{ show: $v.localDescription.$error }"
          >Please enter survey description.</span
        >
      </div>
      <div class="form-mandatory">*Mandatory fields</div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="next"
        >Next
      </CButton>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "StatisticalProgramBasic",
  props: ["localId", "name", "acronym", "description"],
  data() {
    return {
      localLocalId: this.localId,
      localName: this.name,
      localAcronym: this.acronym,
      localDescription: this.description,
      disabled: false,
      fieldChanged: false //do nothing if nothing changes
    };
  },
  validations: {
    localLocalId: {
      required
    },
    localName: {
      required
    },
    localAcronym: {
      required
    },
    localDescription: {
      required
    }
  },
  methods: {
    next() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localLocalId,
          name: this.localName,
          acronym: this.localAcronym,
          description: this.localDescription
        };
        console.log(formData);
        this.$emit("next", formData, this.fieldChanged);
        this.fieldChanged = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
