<template>
  <CRow v-if="unitDataSet">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="unitDataSet"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ unitDataSet.name }}</span>
          <span class="lead"
            >({{ unitDataSet.localId }} {{ unitDataSet.version }} )</span
          >
        </h2>
        <p class="lead" v-if="unitDataSet.description">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ unitDataSet.description }}
          </span>
        </p>
        <CRow>
          <CCol class="col-md-6 col-sm-12">
            <p class="lead">
              <span>
                <strong
                  >{{ $t("structural.dataset.exchange_channel") }}:</strong
                >
                {{ unitDataSet.exchangeChannel }}
              </span>
            </p>
          </CCol>
          <CCol class="col-md-6 col-sm-12">
            <p class="lead">
              <span>
                <strong
                  >{{ $t("structural.dataset.exchange_direction") }}:</strong
                >
                {{ unitDataSet.exchangeDirection }}
              </span>
            </p>
          </CCol>
        </CRow>
        <p class="lead">
          <span>
            <strong>{{ $t("structural.type") }}:</strong>
            {{ unitDataSet.type }}
          </span>
        </p>
      </div>
    </div>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardText>
            <CForm>
              <div class="text-muted">
                <span>{{ unitDataSet.connection }}</span>
              </div>
              <div class="card-group">
                <span><strong>Filter Expression:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ unitDataSet.filterExpression }}</span>
              </div>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UnitDataSetView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("unitDataSet", ["unitDataSet"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/unitDataSets");
    },
  },
  created() {
    this.$store.dispatch("unitDataSet/findById", this.$route.params.id);
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
<style scoped>
.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem;
  }
}
</style>
