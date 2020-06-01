<template>
  <div class="row" v-if="businessService">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Business service (Software)</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="businessService.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="businessService.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="businessService.localId"
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
  name: "Delete",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"])
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("businessService/delete", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  }
};
</script>
