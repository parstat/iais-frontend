<template>
  <CRow v-if="statisticalClassification">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Sattistical Classificaion</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="localId">
                <span>Local id</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.localId"
                disabled
              />
            </CForm>
            <CForm>
              <label for="version">
                <span>Version</span>
              </label>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.version"
                disabled
              />
            </CForm>
            <CForm>
              <label for="name">
                <span>Name</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.name"
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
                v-model.trim="statisticalClassification.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="link">
                <span>Link</span>
              </label>
              <textarea
                rows="5"
                id="link"
                type="text"
                class="form-control mb-3"
                v-model.trim="statisticalClassification.link"
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
  name: "StatisticalClassificationDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalClassification", ["statisticalClassification"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch(
        "statisticalClassification/delete",
        this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch(
      "statisticalClassification/findById",
      this.$route.params.id
    );
  },
};
</script>
