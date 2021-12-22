<template>
  <div class="row" v-if="agent">
    <div class="col-sm-12 col-md-6">
      <div class="card">
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
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              v-model.trim="agent.description"
              disabled
            />
          </div>
          <div class="form-group" v-if="agent.account">
            <label for="responsible">Account</label>
            <input
              id="account"
              type="text"
              class="form-control"
              v-model.trim="agent.account.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="type">Type</label>
            <input
              id="type"
              type="text"
              class="form-control"
              v-model.trim="agent.type"
              disabled
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AgentDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["agent"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("agent/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("agent/findById", this.$route.params.id);
  },
};
</script>
