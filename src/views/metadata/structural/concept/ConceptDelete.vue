<template>
  <CRow v-if="concept">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.concept") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="concept.name"
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
                v-model.trim="concept.description"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("structural.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="concept.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click="handleDelete()"
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
  name: "ConceptDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("concept", ["concept"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("concept/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("concept/findById", this.$route.params.id);
  },
};
</script>
