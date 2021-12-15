<template>
  <div class="row" v-if="legislativeReference">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Legislative reference</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="legislativeReference.name"
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
              v-model.trim="legislativeReference.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Type</label>
            <input
              id="type"
              type="text"
              class="form-control"
              v-model.trim="legislativeReference.type"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="legislativeReference.localId"
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
  name: "legislativeReferenceDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch(
        "legislativeReference/delete",
        this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch(
      "legislativeReference/findById",
      this.$route.params.id
    );
  },
};
</script>
