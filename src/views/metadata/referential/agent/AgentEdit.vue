<template>
  <div class="row" v-if="agent">
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
              :class="{ 'is-invalid': $v.agent.name.$error }"
              placeholder="Agent name"
              v-model.trim="agent.name"
            />
            <span class="help-block" :class="{ show: $v.agent.name.$error }"
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
              placeholder="Select a type"
            ></v-select>
            <span class="help-block" :class="{ show: $v.agent.type.$error }"
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
              v-model.trim="agent.localId"
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
import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "AgentEdit",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"]),
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    }
  },
  validations: {
    agent: {
      name: {
        required
      },
      type: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.agent.id,
          name: this.agent.name,
          description: this.agent.description,
          type: this.agent.type,
          localId: this.agent.localId
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
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  }
};
</script>

<style scoped>
.vs__selected-options {
  padding: 0 2px 6px 2px;
}
</style>
