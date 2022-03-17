<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
    <CCol xs>
      <CCard v-if="statisticalStandard">
        <CCardBody>
          <CCardTitle>
            <span>{{ statisticalStandard.name }}</span>
          </CCardTitle>
          <CCardText>
            <label for="description">
              <strong>{{ $t("referential.description") }}:</strong>
            </label>
            <div class="text-muted" id="description">
              <span>{{ statisticalStandard.description }}</span>
            </div>
            <div class="card-text">
              <span class="card-text">
                <strong>{{ $t("referential.type") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ statisticalStandard.type }}</span>
            </div>
            <div class="card-text" v-if="statisticalStandard.externalLink">
              <span class="card-text">
                <strong>{{ $t("referential.link") }}:</strong>
              </span>
            </div>
            <div class="text-muted" v-if="statisticalStandard.externalLink">
              <a :href="statisticalStandard.externalLink">{{
                statisticalStandard.externalLink
              }}</a>
            </div>
            <div class="card-text">
              <span class="card-text">
                <strong>{{ $t("referential.local_ID") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ statisticalStandard.localId }}</span>
            </div>
          </CCardText>

          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            ><span>{{ $t("referential.back") }}</span></CButton
          >
        </CCardBody>
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
