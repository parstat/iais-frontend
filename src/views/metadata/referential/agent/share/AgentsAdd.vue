<template>
  <div class="card">
    <header class="card-header pt-0">
      <user-icon />
      <strong class="icon-header">Agents</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/agent/add"
          class="card-header-action"
        >
          <add-icon />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </header>
    <div class="card-body">
      <div class="form-group" v-if="owners">
        <label for="organization">Organization*</label>
        <v-select
          label="name"
          :options="owners"
          v-model="owner"
          :class="{ 'is-invalid': $v.owner.$error }"
          placeholder="Select an organization"
        ></v-select>
        <span class="help-block" :class="{ show: $v.owner.$error }"
          >Please select an Organization.</span
        >
      </div>
      <div class="form-group" v-if="maintainers">
        <label for="division">Division*</label>
        <v-select
          label="name"
          :options="maintainers"
          v-model="maintainer"
          :class="{ 'is-invalid': $v.maintainer.$error }"
          placeholder="Select a division"
        ></v-select>
        <span class="help-block" :class="{ show: $v.maintainer.$error }"
          >Please select a division.</span
        >
      </div>
      <div class="form-group" v-if="contacts">
        <label for="contact">Contact person*</label>
        <v-select
          label="name"
          :options="contacts"
          v-model="contact"
          :class="{ 'is-invalid': $v.contact.$error }"
          placeholder="Select a contact person"
        ></v-select>
        <span class="help-block" :class="{ show: $v.contact.$error }"
          >Please select a contact person.</span
        >
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="back"
        :disabled="disabled"
        >Back</CButton
      >
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click.prevent="next"
        :disabled="disabled"
        >Next</CButton
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Agent } from "@/common";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AgentsAdd",
  data() {
    return {
      owner: {},
      maintainer: {},
      contact: {},
      disabled: false,
      activeTab: 0
    };
  },
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"])
  },
  validations: {
    owner: {
      required
    },
    maintainer: {
      required
    },
    contact: {
      required
    }
  },
  methods: {
    next() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const agents = {
          owner: this.owner,
          maintainer: this.maintainer,
          contact: this.contact
        };
        this.$emit("next", agents);
        console.log(agents);
      }
    },
    back() {
      this.$emit("back");
    }
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
