<template>
  <div class="card">
    <header class="card-header">
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
        <label for="description">Organization*</label>
        <v-select
          label="name"
          :options="owners"
          :class="{ 'is-invalid': $v.statisticalProgram.owner.$error }"
          v-model="statisticalProgram.owner"
          @input="updateOwner"
        ></v-select>
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.owner.$error }"
          >Please select an Organization.</span
        >
      </div>
      <div class="form-group" v-if="maintainers">
        <label for="description">Division*</label>
        <v-select
          label="name"
          :options="maintainers"
          :class="{ 'is-invalid': $v.statisticalProgram.maintainer.$error }"
          v-model="statisticalProgram.maintainer"
          @input="updateMaintainer"
        ></v-select>
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.maintainer.$error }"
          >Please select a division.</span
        >
      </div>
      <div class="form-group" v-if="contacts">
        <label for="description">Contact person*</label>
        <v-select
          label="name"
          :options="contacts"
          :class="{ 'is-invalid': $v.statisticalProgram.contact.$error }"
          v-model="statisticalProgram.contact"
          @input="updateContact"
        ></v-select>
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.contact.$error }"
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
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="$emit('next')"
      >
        Next
      </CButton>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "StatisticalProgramEditAgent",
  validations: {
    statisticalProgram: {
      owner: {
        required
      },
      maintainer: {
        required
      },
      contact: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("agent", ["owners", "maintainers", "contacts"])
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  },
  methods: {
    updateOwner() {
      this.$v.owner.$touch(); //validate field
      if (!this.$v.owner.$invalid) {
        const formData = {
          id: this.statisticalProgram.id,
          owner: this.statisticalProgram.owner.id
        };
        this.$store.dispatch("statisticalProgram/updateOwner", formData);
      }
    },
    updateMaintainer() {
      this.$v.maintainer.$touch(); //validate field
      if (!this.$v.maintainer.$invalid) {
        const formData = {
          id: this.statisticalProgram.id,
          maintainer: this.statisticalProgram.maintainer.id
        };
        this.$store.dispatch("statisticalProgram/updateMaintainer", formData);
      }
    },
    updateContact() {
      this.$v.contact.$touch(); //validate field
      if (!this.$v.contact.$invalid) {
        const formData = {
          id: this.statisticalProgram.id,
          contact: this.statisticalProgram.contact.id
        };
        this.$store.dispatch("statisticalProgram/updateContact", formData);
      }
    }
  }
};
</script>
