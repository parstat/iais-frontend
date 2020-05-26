<template>
  <div class="row" v-if="agent">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
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
              v-model.trim="agent.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="name">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="agent.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="acronym">Type</label>
            <input
              id="type"
              type="text"
              class="form-control"
              v-model.trim="agent.type"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="agent.localId"
              disabled
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
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
      disabled: false
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/agent");
    }
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  }
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
