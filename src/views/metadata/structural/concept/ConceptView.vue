<template>
  <CCRow v-if="concept">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ concept.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <div class="card-group">
                <span><strong>Description:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ concept.description }}</span>
              </div>
              <div class="card-group">
                <span><strong>Definition:</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ concept.definition }}</span>
              </div>
              <div class="card-group">
                <span><strong>Version: </strong></span>
              </div>
              <div class="text-muted">
                <span>{{ concept.version }}</span>
              </div>
              <div class="card-group">
                <span><strong>Local id</strong></span>
              </div>
              <div class="text-muted">
                <span>{{ concept.localId }}</span>
              </div>
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleBack()"
            :disabled="disabled"
            >Back</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CCRow>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "ConceptView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("concept", ["concept"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/concepts");
    },
  },
  created() {
    this.$store.dispatch("concept/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
