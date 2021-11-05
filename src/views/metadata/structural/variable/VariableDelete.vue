<template>
  <div class="row" v-if="variable">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Variable</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="variable.name"
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
              v-model.trim="variable.description"
              disabled
            />
          </div>
          <div class="form-group" v-if="variable.account">
            <label for="responsible">Account</label>
            <input
              id="account"
              type="text"
              class="form-control"
              v-model.trim="variable.account.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="type">Type</label>
            <input
              id="type"
              type="text"
              class="form-control"
              v-model.trim="variable.type"
              disabled
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
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
  name: "VariableDelete",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("variable", ["variable"])
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("variable/delete", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  }
};
</script>
