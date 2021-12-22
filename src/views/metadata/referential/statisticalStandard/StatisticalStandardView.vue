<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
    <CCol xs>
      <CCard>
        <CCardHeader component="h5">
          {{ statisticalStandard.name }}
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span><strong>Descripton: </strong></span>
          </CCardText>
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
          <div class="card-slot" v-if="statisticalStandard.externalLink">
            <a :href="statisticalStandard.externalLink">{{
              statisticalStandard.externalLink
            }}</a>
          </div>
          <div class="card-text">
            <span class="card-text"><strong>Id: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ statisticalStandard.localId }}</span>
          </div>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalStandardView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/standard");
    },
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
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
