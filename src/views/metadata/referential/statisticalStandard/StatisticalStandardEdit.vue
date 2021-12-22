<template>
  <div class="row" v-if="statisticalStandard">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Statistical Standard</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.statisticalStandard.name.$error }"
              placeholder="statisticalStandard name"
              v-model.trim="statisticalStandard.name"
            />
            <span
              class="help-block"
              :class="{ show: v$.statisticalStandard.name.$error }"
              >Please enter statistical standard name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="statisticalStandard description"
              v-model.trim="statisticalStandard.description"
            />
            <span class="help-block">
              Please enter an statistical standard description</span
            >
          </div>
          <div class="form-group">
            <label for="account">Type</label>
            <v-select
              label="type"
              :options="types"
              v-model="statisticalStandard.type"
              :class="{ 'is-invalid': v$.statisticalStandard.type.$error }"
              placeholder="Select a type"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: v$.statisticalStandard.type.$error }"
              >Please select a type.</span
            >
          </div>
          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="statisticalStandard.localId"
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Update</CButton
          >
          <CButton
            color="danger"
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
import { Standard } from "@/common";

export default {
  name: "StatisticalStandardEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"]),
    types() {
      var types = [];
      for (const key of Object.keys(Standard)) {
        types.push(Standard[key]);
      }
      return types;
    },
  },
  validations: {
    statisticalStandard: {
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
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.statisticalStandard.id,
          name: this.statisticalStandard.name,
          description: this.statisticalStandard.description,
          type: this.statisticalStandard.type,
          link: this.statisticalStandard.link,
          version: this.statisticalStandard.version,
          localId: this.statisticalStandard.localId,
        };
        this.$store.dispatch("statisticalStandard/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.statisticalStandard.name = "";
      this.statisticalStandard.description = "";
      this.statisticalStandard.type = "";
      this.statisticalStandard.link = "";
      this.statisticalStandard.version = "";
      this.statisticalStandard.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
  },
};
</script>
