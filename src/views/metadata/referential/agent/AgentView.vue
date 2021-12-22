<template>
  <div class="row" v-if="agent">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>{{ agent.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Description:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ agent.description }}</span>
          </div>
          <div class="card-group">
            <span><strong>Type: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ agent.type }}</span>
          </div>
          <div class="card-group">
            <span><strong>Parent:</strong></span>
          </div>
          <div class="card-slot">
            <span v-if="agent.parent">{{ agent.parent.name }}</span>
            <span v-else class="pl-4">&ndash;</span>
          </div>
          <div class="card-group">
            <span><strong>Local id</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ agent.localId }}</span>
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AgentView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/agent");
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  },
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
