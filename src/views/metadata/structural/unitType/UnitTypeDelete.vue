<template>
  <CRow v-if="unitType">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Unit type</span>
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
                v-model.trim="unitType.name"
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
                v-model.trim="unitType.description"
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
                v-model.trim="unitType.localId"
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
  name: "UnitTypeDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("unitType", ["unitType"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("unitType/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("unitType/findById", this.$route.params.id);
  },
};
</script>
