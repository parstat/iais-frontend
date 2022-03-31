<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processDocumentation">
        <CCardBody>
          <CCardTitle>
            <span>{{ processDocumentation.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="processDocumentation.description"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="processDocumentation.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>{{ $t("referential.delete") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch(
        "processDocumentation/delete",
        this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch(
      "processDocumentation/findById",
      this.$route.params.id
    );
  },
};
</script>
