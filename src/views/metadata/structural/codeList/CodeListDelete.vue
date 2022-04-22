<template>
  <CRow v-if="codeList">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.statistical_classification") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("structural.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('structural.local_ID')"
                v-model.trim="codeList.localId"
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
                :placeholder="$t('structural.code_list_name')"
                v-model.trim="codeList.name"
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
                :placeholder="$t('structural.code_list_description')"
                v-model.trim="codeList.description"
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
  name: "CodeListDelete",
  computed: {
    ...mapGetters("codeList", ["codeList"]),
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("codeList/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("codeList/findById", this.$route.params.id);
  },
};
</script>
<style></style>
