<template>
  <div class="card">
    <header class="card-header pt-0">
      <users-icon />
      <strong class="icon-header">Agents</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/agent/add"
          class="card-header-action"
        >
          <add-box-icon />
        </router-link>
      </div>
    </header>
    <div class="card-body">
      <div class="form-group" v-if="owners">
        <label for="description">Organization*</label>
        <v-select
          label="name"
          :options="owners"
          :class="{ 'is-invalid': $v.localOwner.$error }"
          v-model="localOwner"
          @input="updateOwner"
        ></v-select>
        <span class="help-block" :class="{ show: $v.localOwner.$error }"
          >Please select an Organization.</span
        >
      </div>
      <div class="form-group" v-if="maintainers">
        <label for="description">Division*</label>
        <v-select
          label="name"
          :options="maintainers"
          :class="{ 'is-invalid': $v.localMaintainer.$error }"
          v-model="localMaintainer"
          @input="updateMaintainer"
        ></v-select>
        <span class="help-block" :class="{ show: $v.localMaintainer.$error }"
          >Please select a division.</span
        >
      </div>
      <div class="form-group" v-if="contacts">
        <label for="description">Contact person*</label>
        <v-select
          label="name"
          :options="contacts"
          :class="{ 'is-invalid': $v.localContact.$error }"
          v-model="localContact"
          @input="updateContact"
        ></v-select>
        <span class="help-block" :class="{ show: $v.localContact.$error }"
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
        @click="$emit('next', fieldChanged)"
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
  name: "AgentsEdit",
  props: {
    owner: {
      type: Object,
      default: () => {}
    },
    maintainer: {
      type: Object,
      default: () => {}
    },
    contact: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      localOwner: { ...this.owner }, //clone the object
      localMaintainer: { ...this.maintainer }, //clone the object
      localContact: { ...this.contact }, //clone the object
      fieldChanged: false
    };
  },
  validations: {
    localOwner: {
      required
    },
    localMaintainer: {
      required
    },
    localContact: {
      required
    }
  },
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"])
  },
  methods: {
    updateOwner() {
      this.$v.localOwner.$touch(); //validate field
      if (!this.$v.localOwner.$invalid) {
        this.$emit("updateOwner", this.localOwner);
        this.fieldChanged = true;
      }
    },
    updateMaintainer() {
      this.$v.localMaintainer.$touch(); //validate field
      if (!this.$v.localMaintainer.$invalid) {
        this.$emit("updateMaintainer", this.localMaintainer);
        this.fieldChanged = true;
      }
    },
    updateContact() {
      this.$v.localContact.$touch(); //validate field
      if (!this.$v.localContact.$invalid) {
        this.$emit("updateContact", this.localContact);
        this.fieldChanged = true;
      }
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
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
