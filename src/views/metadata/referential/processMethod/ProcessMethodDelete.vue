<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="processMethod">
        <CCardBody>
          <CCardTitle> {{processMethod.name}} </CCardTitle>
          <CCardText>
            <CForm>
              <label for="responsible">Description</label>
              <input
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="processMethod.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Local id</label>
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
