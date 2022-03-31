<template>
  <CRow v-if="measurementType">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Measurement type</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">
                <span>Name</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="measurementType.name"
                disabled
              />
            </CForm>
            <CForm>
              <label for="description">
                <span>Description</span>
              </label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="measurementType.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="localId">
                <span>Local id</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="measurementType.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>Delete</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "MeasurementTypeDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("measurementType", ["measurementType"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("measurementType/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("measurementType/findById", this.$route.params.id);
  },
};
</script>
