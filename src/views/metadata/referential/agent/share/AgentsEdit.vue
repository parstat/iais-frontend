<template>
  <CCard>
    <CCardHeader>
      <CIcon name="cil-user" />
      <strong class="icon-header">Agents</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/agent/add"
          class="card-header-action"
        >
          <CIcon name="cil-plus" /> Add
        </router-link>
      </div>
    </CCardHeader>
    <div class="card-body">
      <div class="form-group" v-if="localSP">
        <label for="description">Organization*</label>
        <v-select
          label="name"
          :options="owners"
          v-model="localSP.owner"
          @input="updateOwner"
        ></v-select>
        <span class="help-block">Please select an Organization.</span>
      </div>
      <div class="form-group" v-if="localSP">
        <label for="description">Division*</label>
        <v-select
          label="name"
          :options="maintainers"
          v-model="localSP.maintainer"
          @input="updateMaintainer"
        ></v-select>
        <span class="help-block">Please select a division.</span>
      </div>
      <div class="form-group" v-if="localSP">
        <label for="description">Contact person*</label>
        <v-select
          label="name"
          :options="contacts"
          v-model="localSP.contact"
          @input="updateContact"
        ></v-select>
        <span class="help-block">Please select a contact person.</span>
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('next', fieldChanged)"
      >
        Next
      </CButton>
    </div>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { Agent } from "@/common";

export default {
  name: "AgentsEdit",
  props: {
    sp: {},
  },
  data() {
    return {
      v$: useValidate(),
      localSP: { ...this.sp },
    };
  },
  validations: {},
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"]),
  },
  methods: {
    updateOwner: function (owner) {
      if (typeof owner.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          owner: owner.id,
        };
        this.$store.dispatch("statisticalProgram/updateOwner", formData);
        this.fieldChanged = true;
      }
    },
    updateMaintainer: function (maintainer) {
      if (typeof maintainer.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          maintainer: maintainer.id,
        };
        this.$store.dispatch("statisticalProgram/updateMaintainer", formData);
        this.fieldChanged = true;
      }
    },
    updateContact: function (contact) {
      if (typeof contact.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          contact: contact.id,
        };
        this.$store.dispatch("statisticalProgram/updateContact", formData);
        this.fieldChanged = true;
      }
    },
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  },
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
