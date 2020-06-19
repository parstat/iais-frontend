<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <text-icon />
          <strong class="icon-header"
            >Statistical process: {{ statisticalProgram.name }}</strong
          >
        </div>
        <div class="card-body">
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab title="Basic">
              <app-statistical-program @next="next"></app-statistical-program>
            </CTab>
            <CTab title="Agents">
              <app-agents @back="back" @next="next"></app-agents>
            </CTab>
            <CTab title="Legislative References">
              <app-references @next="next" @back="back"></app-references>
            </CTab>
            <CTab title="Statistical Standards">
              <app-standards @next="next" @back="back"></app-standards>
            </CTab>
            <CTab title="Process Documentations">
              <app-documentations @handleBack="handleBack" />
            </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Agents from "./Agents";
import LegislativeReferences from "./LegislativeReferences";
import StatisticalStandards from "./StatisticalStandards";
import ProcessDocumentations from "./ProcessDocumentations";
import StatisticalProgram from "./StatisticalProgram";

import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "StatisticalProgramEdit",
  data() {
    return {
      disabled: false,
      activeTab: 0
    };
  },
  components: {
    "app-agents": Agents,
    "app-references": LegislativeReferences,
    "app-standards": StatisticalStandards,
    "app-documentations": ProcessDocumentations,
    "app-statistical-program": StatisticalProgram
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  validations: {
    statisticalProgram: {
      localId: {
        required
      },
      name: {
        required
      },
      acronym: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/");
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  }
};
</script>

<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-left-width: 4px;
  border-left-style: solid;
  background-color: #f8f8f8;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #321fdb;
  color: #321fdb;
  border-radius: unset;
  padding-left: 0.8rem;
}
</style>
