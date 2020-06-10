<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>{{ statisticalProgram.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Survey id</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ statisticalProgram.id }}</span>
          </div>
          <div class="card-group">
            <span><strong>Survey Acronym</strong></span>
          </div>
          <div class="card-slot">
            <span> {{ statisticalProgram.acronym }}</span>
          </div>
          <div class="card-group">
            <span><strong>Survey description</strong></span>
          </div>
          <div class="card-slot">
            <span> {{ statisticalProgram.description }}</span>
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
  name: "StatisticalProgramView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential");
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
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
