<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="agent">
        <CCardHeader component="h5"> Agent </CCardHeader>
        <CCardBody>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.agent.name.$error }"
              placeholder="Agent name"
              v-model.trim="agent.name"
            />
            <span class="help-block" :class="{ show: v$.agent.name.$error }"
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
              v-model.trim="agent.description"
            />
            <span class="help-block"> Please enter an agent</span>
          </div>
          <div class="form-group">
            <label for="account">Type</label>
            <v-select
              label="type"
              :options="types"
              v-model="agent.type"
              :class="{ 'is-invalid': v$.agent.type.$error }"
              placeholder="Select a type"
            ></v-select>
            <span class="help-block" :class="{ show: v$.agent.type.$error }"
              >Please select a type.</span
            >
          </div>
          <div class="form-group">
            <label for="parent">Parent</label>
            <v-select
              label="name"
              :options="parents"
              v-model="agent.parent"
              placeholder="Select a parent"
            ></v-select>
            <span class="help-block">Please select a parent.</span>
          </div>
          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="agent.localId"
            />
          </div>
        </CCardBody>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Agent } from "@/common";

export default {
  name: "AgentEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  watch: {
    "agent.type": function getParents() {
      this.getParents(this.agent.type);
    },
  },
  computed: {
    ...mapGetters("agent", ["agent", "parents"]),
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    },
  },
  validations: {
    agent: {
      name: {
        required,
      },
      type: {
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
          id: this.agent.id,
          name: this.agent.name,
          description: this.agent.description,
          type: this.agent.type,
          parent: this.agent.parent.id,
          localId: this.agent.localId,
        };
        this.$store.dispatch("agent/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.agent.name = "";
      this.agent.description = "";
      this.agent.type = "";
      this.agent.localId = "";
      this.v$.$reset();
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
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  },
};
</script>
