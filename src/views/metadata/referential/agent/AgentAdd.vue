<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Agent</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Agent name"
              v-model.trim="name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }"
              >Please enter agent name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              placeholder="Agent description"
              v-model.trim="description"
            />
            <span class="help-block"> Please enter an agent</span>
          </div>
          <div class="form-group">
            <label for="account">Type</label>
            <v-select
              label="type"
              :options="types"
              v-model="type"
              placeholder="Select a type"
            ></v-select>
            <span class="help-block" :class="{ show: $v.type.$error }"
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
              v-model.trim="localId"
            />
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
import { Agent } from "@/common";

export default {
  name: "AgentAdd",
  data() {
    return {
      name: "",
      description: "",
      type: "",
      parent: "",
      localId: "",
      disabled: false
    };
  },
  computed: {
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    }
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    },
    type: {
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
          description: this.description,
          type: this.type,
          localId: this.localId
        };
        this.$store.dispatch("agent/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.localId = "";
      this.$v.$reset();
    }
  }
};
</script>

<style scoped>
.vs__selected-options {
  padding: 0 2px 6px 2px;
}
</style>
