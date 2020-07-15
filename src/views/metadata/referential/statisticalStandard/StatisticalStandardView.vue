<template>
  <div class="row" v-if="statisticalStandard">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>{{ statisticalStandard.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-text">
            <span><strong>Descripton: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ statisticalStandard.description }}</span>
          </div>
          <div class="card-text">
            <span class="card-text"><strong>Type: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ statisticalStandard.type }}</span>
          </div>
          <div class="card-text" v-if="statisticalStandard.externalLink">
            <span class="card-text"><strong>Link: </strong></span>
          </div>
          <div class="card-slot"  v-if="statisticalStandard.externalLink">
            <a :href="statisticalStandard.externalLink">{{ statisticalStandard.externalLink }}</a>
          </div>
          <div class="card-text">
            <span class="card-text"><strong>Id: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ statisticalStandard.localId }}</span>
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
  name: "StatisticalStandardView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/standard");
    }
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
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
