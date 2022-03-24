<template>
  <CRow v-if="concept">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Concept</span>
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
                v-model.trim="concept.name"
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
                v-model.trim="concept.description"
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
                v-model.trim="concept.localId"
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
  name: "ConceptDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("concept", ["concept"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("concept/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("concept/findById", this.$route.params.id);
  },
};
</script>
