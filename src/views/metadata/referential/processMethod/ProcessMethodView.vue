<template>
  <div class="row" v-if="processMethod">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Process Method</strong>
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
            <label for="name">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="processMethod.description"
              disabled
            />
          </div>
        </div>
        <div class="form-group">
          <label for="localId">Local id</label>
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
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProcessMethodView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("processMethod", ["processMethod"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/method");
    }
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
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
