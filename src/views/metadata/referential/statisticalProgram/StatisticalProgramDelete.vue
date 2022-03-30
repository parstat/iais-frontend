<template>
  <CRow v-if="statisticalProgram">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <header class="card-header">
              <CIcon name="cil-trash" />
              <span>
                <strong class="icon-header">{{
                  $t("referential.statistical_process")
                }}</strong>
              </span>
            </header>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.survey_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control"
                v-model.trim="statisticalProgram.localId"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.survey_name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control"
                v-model.trim="statisticalProgram.name"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="acronym">
                <span>{{ $t("referential.survey_acronym") }}</span>
              </CFormLabel>
              <input
                id="acronym"
                type="text"
                class="form-control"
                v-model.trim="statisticalProgram.acronym"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="responsible">
                <span>{{ $t("referential.survey_description") }}</span>
              </CFormLabel>
              <input
                id="description"
                type="text"
                class="form-control"
                v-model.trim="statisticalProgram.description"
                disabled
              />
            </CForm>
          </CCardText>
          <div class="card-footer">
            <CButton
              color="primary"
              size="sm"
              @click.prevent="handleDelete()"
              :disabled="disabled"
              ><span>{{ $t("referential.delete") }}</span>
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("statisticalProgram/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
  },
};
</script>
