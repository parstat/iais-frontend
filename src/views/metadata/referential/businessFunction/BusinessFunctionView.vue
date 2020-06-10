<template>
  <div class="row" v-if="businessFunction">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>{{ businessFunction.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Description:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ businessFunction.description }}</span>
          </div>
          <div class="card-group">
            <span><strong>Sub-phase number:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ businessFunction.localId }}</span>
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
