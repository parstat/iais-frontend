<template>
  <CRow v-if="legislativeReference">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ legislativeReference.name }}</span>
          </CCardTitle>
          <CCardText>
            <div class="card-text">
              <span>
                <strong>{{ $t("referential.description") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ legislativeReference.description }}</span>
            </div>
            <div class="card-text">
              <span>
                <strong>{{ $t("referential.type") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ legislativeReference.type }}</span>
            </div>
            <div class="card-text" v-if="legislativeReference.externalLink">
              <span>
                <strong>{{ $t("referential.link") }}:</strong>
              </span>
            </div>
            <div class="text-muted" v-if="legislativeReference.externalLink">
              <a :href="legislativeReference.externalLink">
                {{ legislativeReference.externalLink }}
              </a>
            </div>
            <div class="card-text">
              <span>
                <strong>{{ $t("referential.local_ID") }}:</strong>
              </span>
            </div>
            <div class="text-muted">
              <span>{{ legislativeReference.localId }}</span>
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
  name: "LegislativeReferenceView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/referential/gsim/regulation");
    },
  },
  created() {
    this.$store.dispatch(
      "legislativeReference/findById",
      this.$route.params.id
    );
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
