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
          class="card  bg-light mb-3"
          v-for="maintainer of processDocumentation.maintainers"
          :key="maintainer.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ maintainer.name }}</strong>
              <router-link
                tag="a"
                :to="{
                  name: 'AgentView',
                  params: { id: maintainer.id }
                }"
              >
                <view-icon />
              </router-link>
              <span v-on:click="removeMaintainer(maintainer)">
                <delete-icon />
              </span>
            </div>
          </div>
          <div class="card-body"></div>
        </div>
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
//import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "ProcessDocumentationAgentEdit",
  validations: {
    processDocumentation: {}
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("agent", ["maintainers"])
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Division);
  },
  methods: {
    addMaintainer(selectedMaintainer) {
      const formData = {
        id: this.processDocumentation.id,
        maintainer: selectedMaintainer.id
      };
      this.$store.dispatch("processDocumentation/addMaintainer", formData);
    },

    removeMaintainer(selectedMaintainer) {
      const formData = {
        id: this.processDocumentation.id,
        maintainer: selectedMaintainer.id
      };
      this.$store.dispatch("processDocumentation/removeMaintainer", formData);
    }
  }
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
  display: inline-block !important;
}
.card-columns {
  column-count: 2;
}
.card-header {
  padding-top: 1rem;
}
</style>
