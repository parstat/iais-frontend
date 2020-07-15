<template>
  <div class="row" v-if="legislativeReference">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>{{ legislativeReference.name }}</strong>
        </header>
        <div class="card-body">
          <div class="card-text">
            <span><strong>Description:</strong></span>
          </div>
          <div class="card-slot">
            <span> {{ legislativeReference.description }} </span>
          </div>
          <div class="card-text">
            <span><strong>Type: </strong></span>
          </div>
          <div class="card-slot">
            <span> {{ legislativeReference.type }} </span>
          </div>
          <div class="card-text" v-if="legislativeReference.externalLink">
            <span><strong>Link:</strong></span>
          </div>
          <div class="card-slot" v-if="legislativeReference.externalLink">
            <a :href="legislativeReference.externalLink">
              {{ legislativeReference.externalLink }}
            </a>
          </div>
          <div class="card-text">
            <span><strong>Id:</strong></span>
          </div>
          <div class="card-slot">
            <span> {{ legislativeReference.localId }} </span>
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
  name: "LegislativeReferenceView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/regulation");
    }
  },
  created() {
    this.$store.dispatch(
      "legislativeReference/findById",
      this.$route.params.id
    );
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
