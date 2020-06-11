<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Agent</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name*</label>
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
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="Agent description"
              v-model.trim="description"
            />
            <span class="help-block">Please enter a description</span>
          </div>
          <div class="form-group">
            <label for="type">Type*</label>
            <v-select
              label="type"
              :options="types"
              v-model="type"
              :class="{ 'is-invalid': $v.type.$error }"
              placeholder="Select a type"
              @input="getParents"
            ></v-select>
            <span class="help-block" :class="{ show: $v.type.$error }"
              >Please select a type.</span
            >
          </div>
          <div class="form-group">
            <label for="parent">Parent</label>
            <v-select
              label="name"
              :options="parents"
              v-model="parent"
              placeholder="Select a parent"
            ></v-select>
            <span class="help-block">Please select a parent.</span>
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
import { mapGetters } from "vuex";
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
    ...mapGetters("agent", ["parents"]),
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
    type: {
      required
    },
    localId: {
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
          parent: this.parent.id,
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
    },
    getParents(type) {
      if (type === "DIVISION") {
        this.$store.dispatch("agent/findByType", Agent.Organization);
        return;
      }
      if (type === "INDIVIDUAL") {
        this.$store.dispatch("agent/findByType", Agent.Division);
        return;
      }
      this.$store.dispatch("agent/clearParents");
      return;
    }
  }
};
</script>
