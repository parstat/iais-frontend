<template>
  <div class="row" v-if="legislativeReference">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>legislativeReference</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.legislativeReference.name.$error }"
              placeholder="legislativeReference name"
              v-model.trim="legislativeReference.name"
            />
            <span
              class="help-block"
              :class="{ show: v$.legislativeReference.name.$error }"
              >Please enter legislativeReference name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="legislativeReference description"
              v-model.trim="legislativeReference.description"
            />
            <span class="help-block">
              Please enter an legislativeReference</span
            >
          </div>
          <div class="form-group">
            <label for="account">Type</label>
            <v-select
              label="type"
              :options="types"
              v-model="legislativeReference.type"
              :class="{ 'is-invalid': v$.legislativeReference.type.$error }"
              placeholder="Select a type"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: v$.legislativeReference.type.$error }"
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
              v-model.trim="legislativeReference.localId"
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
import { Regulation } from "@/common";

export default {
  name: "LegislativeReferenceEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"]),
    types() {
      var types = [];
      for (const key of Object.keys(Regulation)) {
        types.push(Regulation[key]);
      }
      return types;
    },
  },
  validations: {
    legislativeReference: {
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
          id: this.legislativeReference.id,
          name: this.legislativeReference.name,
          description: this.legislativeReference.description,
          type: this.legislativeReference.type,
          link: this.legislativeReference.link,
          version: this.legislativeReference.version,
          localId: this.legislativeReference.localId,
        };
        this.$store.dispatch("legislativeReference/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.legislativeReference.name = "";
      this.legislativeReference.description = "";
      this.legislativeReference.type = "";
      this.legislativeReference.link = "";
      this.legislativeReference.version = "";
      this.legislativeReference.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch(
      "legislativeReference/findById",
      this.$route.params.id
    );
  },
};
</script>
