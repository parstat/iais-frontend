<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h5>
            <text-icon />
            <strong class="icon-header">Statistical process</strong>
          </h5>
        </div>
        <div class="card-body">
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab title="Basic">
              <app-statisticalprogram-basic
                :localId="localId"
                :name="name"
                :acronym="acronym"
                :descriptiom="description"
                @next="handleBasic"
              />
            </CTab>
            <CTab title="Agent">
              <app-agents-add @back="handleBack" @next="handleSubmit" />
            </CTab>
            <CTab title="Legislative References" disabled> </CTab>
            <CTab title="Statistical Standards" disabled> </CTab>
            <CTab title="Process Documentations" disabled> </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatisticalProgramBasic from "./StatisticalProgramBasic";
import AgentsAdd from "../agent/share/AgentsAdd";

export default {
  name: "StatisticalProgramAdd",
  data() {
    return {
      localId: "",
      name: "",
      acronym: "",
      description: "",
      disabled: false,
      activeTab: 0
    };
  },
  components: {
    "app-statisticalprogram-basic": StatisticalProgramBasic,
    "app-agents-add": AgentsAdd
  },
  methods: {
    handleSubmit(agents) {
      this.disabled = true; //disable buttons
      const formData = {
        localId: this.localId,
        name: this.name,
        acronym: this.acronym,
        description: this.description,
        owner: agents.owner.id,
        maintainer: agents.maintainer.id,
        contact: agents.contact.id
      };
      this.$store.dispatch("statisticalProgram/save", formData);
      console.log(formData);
    },
    handleBasic(basic) {
      this.localId = basic.localId;
      this.name = basic.name;
      this.acronym = basic.acronym;
      this.description = basic.description;
      this.activeTab++;
    },
    handleBack() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    }
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
