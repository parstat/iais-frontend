<template>
  <CRow v-if="statisticalClassification">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.statistical_classification") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.localId"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="version">
                <span>{{ $t("structural.version") }}</span>
              </CFormLabel>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.version"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.name"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("structural.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.description"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="link">
                <span>{{ $t("structural.link") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="link"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.link"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>{{ $t("structural.delete") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalClassificationDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalClassification", ["statisticalClassification"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch(
        "statisticalClassification/delete",
        this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch(
      "statisticalClassification/findById",
      this.$route.params.id
    );
  },
};
</script>
