<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="statisticalStandard">
        <CCardBody>
          <CCardTitle> Statistical standard </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                v-model.trim="statisticalStandard.name"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control"
                v-model.trim="statisticalStandard.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Type</label>
              <input
                id="type"
                type="text"
                class="form-control"
                v-model.trim="statisticalStandard.type"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control"
                v-model.trim="statisticalStandard.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalStandardDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("statisticalStandard/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
  },
};
</script>
