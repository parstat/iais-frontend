<template>
  <CRow v-if="measurementUnit">
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
                v-model.trim="measurementUnit.name"
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
                v-model.trim="measurementUnit.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="localid">
                <span>Local id</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="measurementUnit.localId"
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
  name: "MeasurementUnitDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("measurementUnit", ["measurementUnit"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("measurementUnit/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("measurementUnit/findById", this.$route.params.id);
  },
};
</script>
