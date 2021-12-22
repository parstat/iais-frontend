<template>
  <div class="row" v-if="processMethod">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Process Method</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.processMethod.name.$error }"
              placeholder="processMethod name"
              v-model.trim="processMethod.name"
            />
            <span
              class="help-block"
              :class="{ show: v$.processMethod.name.$error }"
              >Please enter processMethod name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="processMethod description"
              v-model.trim="processMethod.description"
            />
            <span class="help-block">
              Please enter an process method description</span
            >
          </div>
          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="processMethod.localId"
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Update</CButton
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
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProcessMethodEdit",
  computed: {
    ...mapGetters("processMethod", ["processMethod"]),
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  validations: {
    processMethod: {
      name: {
        required,
      },
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.processMethod.id,
          name: this.processMethod.name,
          description: this.processMethod.description,
          version: this.processMethod.version,
          localId: this.processMethod.localId,
        };
        this.$store.dispatch("processMethod/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.processMethod.name = "";
      this.processMethod.description = "";
      this.processMethod.version = "";
      this.processMethod.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
  },
};
</script>
