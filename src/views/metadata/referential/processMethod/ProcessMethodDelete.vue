<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle>
            <span>{{ processMethod.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="responsible">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <input
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="processMethod.description"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="responsible">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="processMethod.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click="handleDelete()"
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
  name: "ProcessMethodDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processMethod", ["processMethod"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("processMethod/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("processMethod/findById", this.$route.params.id);
  },
};
</script>
