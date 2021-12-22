<template>
  <div class="row" v-if="businessFunction">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Business function (GSBPM Sub-phase)</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="businessFunction.name"
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
              v-model.trim="businessFunction.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="localid">Sub-phase number</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="businessFunction.localId"
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
  name: "BusinessFunctionDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("businessFunction/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
  },
};
</script>
