<template>
  <CRow v-if="businessFunction">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle> Business function (GSBPM Sub-phase) </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="businessFunction.name"
                disabled
              />
            </CForm>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="businessFunction.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="localid">Sub-phase number</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="businessFunction.localId"
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
  name: "BusinessFunctionDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("businessFunction/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
  },
};
</script>
