<template>
  <CRow v-if="variable">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ variable.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("structural.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="variable.description"
                disabled
              />
            </CForm>
            <CForm v-if="variable.account">
              <CFormLabel for="responsible">
                <span>{{ $t("structural.account") }}</span>
              </CFormLabel>
              <input
                id="account"
                type="text"
                class="form-control"
                v-model.trim="variable.account.name"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="type">
                <span>{{ $t("structural.type") }}</span>
              </CFormLabel>
              <input
                id="type"
                type="text"
                class="form-control"
                v-model.trim="variable.type"
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
  name: "VariableDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("variable", ["variable"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("variable/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  },
};
</script>
