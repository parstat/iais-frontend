<template>
  <div class="card">
    <div class="card-header">
      <user-icon />
      <strong class="icon-header">Agents</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/agent/add"
          class="card-header-action"
        >
          <CIcon name="cil-plus" />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group" v-if="maintainers">
        <label for="description">Division*</label>
        <v-select
          label="name"
          :options="maintainers"
          @input="addMaintainer"
        ></v-select>
        <span class="help-block">Please select a division.</span>
        <div class="card-columns">
          <div
            class="card card-border bg-lighter mb-3"
            v-for="maintainer of processDocumentation.maintainers"
            :key="maintainer.id"
          >
            <div class="card-header">
              <div class="card-title">
                <strong>{{ maintainer.name }}</strong>
                <div class="card-header-actions">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'AgentView',
                      params: { id: maintainer.id },
                    }"
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </router-link>
                  <span v-on:click="removeMaintainer(maintainer)">
                    <CIcon name="cil-trash" />
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{ maintainer.description }}</p>
            </div>
          </div>
        </div>
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
        @click="$emit('next')"
      >
        Next
      </CButton>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
//import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "ProcessDocumentationAgentEdit",
  validations: {
    processDocumentation: {},
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("agent", ["maintainers"]),
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Division);
  },
  methods: {
    addMaintainer(selectedMaintainer) {
      const formData = {
        id: this.processDocumentation.id,
        maintainer: selectedMaintainer.id,
      };
      this.$store.dispatch("processDocumentation/addMaintainer", formData);
    },

    removeMaintainer(selectedMaintainer) {
      const formData = {
        id: this.processDocumentation.id,
        maintainer: selectedMaintainer.id,
      };
      this.$store.dispatch("processDocumentation/removeMaintainer", formData);
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.card-header {
  padding-top: 1rem;
}
</style>
