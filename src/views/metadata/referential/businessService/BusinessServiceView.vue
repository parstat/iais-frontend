<template>
  <div class="row" v-if="businessService">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>{{ businessService.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Description:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ businessService.description }}</span>
          </div>
          <div class="card-group">
            <span><strong>Locla id: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ businessService.localId }}</span>
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
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
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/service");
    },
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  },
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
