<template>
  <CRow v-if="legislativeReference">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.legislative_reference") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">
                <span>{{ $t("referential.name") }}</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.name"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">
                <span>{{ $t("referential.description") }}</span>
              </label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">
                <span>{{ $t("referential.type") }}</span>
              </label>
              <input
                id="type"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.type"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">
                <span>{{ $t("referential.local_ID") }}</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>{{ $t("referential.delete") }}</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "legislativeReferenceDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch(
        "legislativeReference/delete",
        this.$route.params.id
      );
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
