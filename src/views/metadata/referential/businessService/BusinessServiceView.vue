<template>
  <div class="row" v-if="businessService">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Business Service (Software)</strong>
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
            <label for="name">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="businessService.description"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="localId">Locla id</label>
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
  name: "BusinessServiceView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/service");
    }
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
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
