<template>
  <div class="row" v-if="processMethod">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Process method</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="processMethod.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="processMethod.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="processMethod.localId"
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
  name: "ProcessMethodDelete",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("processMethod", ["processMethod"])
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("processMethod/delete", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
  }
};
</script>
