<template>
  <CRow v-if="legislativeReference">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle> Legislative reference </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.name"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Description</label>
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
              <label for="responsible">Type</label>
              <input
                id="type"
                type="text"
                class="form-control mb-3"
                v-model.trim="legislativeReference.type"
                disabled
              />
            </CForm>
            <CForm>
              <label for="responsible">Local id</label>
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
