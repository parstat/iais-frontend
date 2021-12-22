<template>
  <div class="row" v-if="unitType">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>{{ unitType.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Description:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ unitType.description }}</span>
          </div>
          <div class="card-group">
            <span><strong>Definition:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ unitType.definition }}</span>
          </div>
          <div class="card-group">
            <span><strong>Version: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ unitType.version }}</span>
          </div>
          <div class="card-group">
            <span><strong>Local id</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ unitType.localId }}</span>
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
  name: "UnitTypeView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("unitType", ["unitType"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/unitTypes");
    },
  },
  created() {
    this.$store.dispatch("unitType/findById", this.$route.params.id);
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
