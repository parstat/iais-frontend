<template>
  <div class="row" v-if="businessFunction">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Business function (GSBPM sub-phase)</strong>
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
            <label for="localId">Sub-phase number</label>
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
  name: "BusinessFunctionView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/function");
    }
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
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
