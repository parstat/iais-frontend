<template>
  <div class="row" v-if="statisticalStandard">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Statistical standard</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="statisticalStandard.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              v-model.trim="statisticalStandard.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Type</label>
            <input
              id="type"
              type="text"
              class="form-control"
              v-model.trim="statisticalStandard.type"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="statisticalStandard.localId"
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
  name: "StatisticalStandardDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("statisticalStandard/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
  },
};
</script>
